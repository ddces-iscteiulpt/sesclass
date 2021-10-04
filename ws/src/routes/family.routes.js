const express = require("express");
const router = express.Router();
const Item = require("../model/item");
const Tabela = require("../model/tabela");


//////////// GET API - PESQUISA
//exemplo => http://193.136.189.87:5003/search?pesquisa=ão&tabela=Todos&nivel=3&resivao=TRUE&especialidade=Todas

//router.get("/:input_pesquisa/:criterio_tabela/:criterio_nivel", async (req, res) => {
//router.get("/:input_pesquisa/", async (req, res) => {
router.get("/family/:code_item", async (req, res) => {
    try {
      const code_uni = req.params.code_item;
      console.log(`FamilyRoute: ${code_uni}`);

//////////////////////////////////////////////////////////
    var pesquisa1 = {"code_item": "00_00" };
    var pesquisa2 = {"code_item": "00_00" };
    var pesquisa3 = {"code_item": "00_00" };
    var pesquisa4 = {"code_item": "00_00" };
    //var length_code = code_uni.length;
      switch (code_uni.length) {
      case 14:
          var object = code_uni.slice(0, 14);
          var pesquisa4 = {"code_item": object };
      case 11:
          var section = code_uni.slice(0, 11);
          var pesquisa3 = {"code_item": section };
      case 8:
          var subgroup = code_uni.slice(0, 8);
          var pesquisa2 = {"code_item": subgroup };
      case 5:
          var group = code_uni.slice(0, 5);
          var pesquisa1 = {"code_item": group};
      case 2:
          var tabela = code_uni.slice(0, 2);
          var pesquisa0 = {"code_tabela": tabela };
          break;
      default:

    }
    console.log(`Slice: ${tabela}, ${group}, ${subgroup}, ${section}, ${object}.`);
    console.log(`Pesquisa: ${JSON.stringify(pesquisa0)}.`);
    //console.log(JSON.stringify(pesquisa));
    var familia;
    familia = {
      "code_item": code_uni, //"SL_25_10_77",

      "id_Table": "",
      "Code_Table": "",
      "Title_Table": "",

      "id_Group": "",
      "Code_Group": "",//"25",
      "Title_Group": "",

      "id_Subgroup": "",
      "Code_Subgroup": "",//"25",
      "Title_Subgroup": "",

      "id_Section": "",
      "Code_Section": "",//"25",
      "Title_Section": "",

      "id_Object": "",
      "Code_Object": "",//"25",
      "Title_Object": "",
    };

    if(code_uni === undefined || code_uni == ""){
      //search = '\\' + input_pesquisa;
      const data = familia;
    }
    else {
      //familia = { "$regex": input_pesquisa, "$options": "i"} ;

    }
    //var search_log = JSON.stringify(search);
    //console.log(`Parametro search: ${search}`);

    const data0 = await Tabela.find(pesquisa0
      ,null,
          {sort: {"_id": 1}},
          function(err){
          // if there is an error retrieving, send the error. nothing after res.send(err) will execute
          if (err)
          {
            //res.send(err);
            data = err;
            console.log(`err: ${data0}`);
          }
        });


    const data = await Item.find(
      //{$and: [
        {$or: [
          //{$and: [
                pesquisa1 , pesquisa2, pesquisa3, pesquisa4
              ]},

              /*
          {$and: [
                  {"versao_secclas": {}},
              ]},*/
      //]},
      null,
      {sort: {"_id": 1}},
      //{sort: {"Data_traducao": -1}},
      function(err){
      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err)
      {/*
        //res.send(err);
        data = err;
        console.log(`err: ${data}`);*/
      }
    })//.populate(;//.where('nivel_item').lte(nivel);
    //console.log(`Data_out = ${data}`);



//____________////////RES
    res.json({ error: false, data, data0});
  }  catch (err) {
    console.log("Error Item");
    res.json({ error: true, message: err.message });
  }
});
module.exports = router;

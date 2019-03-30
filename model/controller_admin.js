var mongoose = require('mongoose');
var schema= require('./admin_schema');
var user_schema = require('./user_schema');

module.exports = {
    add_doc : function (req, res){
        let add_doctr = new schema.doct(req.body);
        add_doctr.save()
        .then(doc=>{
            res.send("Doctor Added to the list");
            console.log(doc);
        })
        .catch(err=>{
            console.log(err);
        });
    },
    edit_doc : function (req,res){
        schema.doct.findByIdAndUpdate(
            req.params.doc_id,

            req.body,

            {new:true},
            
            (err,schema) =>{
                if(err){
                    console.log(err); 
                    return res.status(500).send(err);
                }
                return res.send(schema);    
            }
        )
    },

    delete_doc : function(req,res){
        schema.doct.findByIdAndRemove(
            req.params.doc_id,
            (err,schema) => {
                if(err){
                    console.log(err);
                    return res.status(500).send(err);
                }
                const response = {
                    message: "Doctor successfully deleted",
                    id: req.params.doc_id,
                };
                return res.status(200).send(response);  
            }
        )
    },
    view_appt : function(req,res){
        var date = new Date(dateString);
        user_schema.bookanappt.find({docId : req.params.docId ,apptDate : date},function(err,docs){
            if(err||!docs){
                console.log(err);
              }
              else{
              res.json(docs);
              console.log(docs);
              }
        });
    },

}
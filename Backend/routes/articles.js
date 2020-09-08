const express = require("express");
const router  = express.Router();
const path = require("path");
const fs = require("fs");
const mongoose = require( 'mongoose' );
const Articles = mongoose.model("Articles");
const Comments = mongoose.model('Comments');

router.get("/" , (req, res , next)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
    const include = req.query.include; 
    console.log(include);
    Articles
        .find( /* { filter object properties } */ )
        // .select( '' ) // projection
        .exec(( err, results ) => {
            if( err ) {
                // keeping things simple we will send the backend error to the frontend - not a good idea usually
                err.status = 500;
                return next( err );
            }
            if(include==="comments"){
                res.status( 200 ).json(results);
                
            }
            else{
                let resultArray = []
                results.forEach((result)=>{
                    let resultObject = {
                        _id:result._id,
                        author:result.author,
                        title:result.title,
                        abstract:result.title,
                        body:result.body,
                        imageUrl:result.imageUrl,
                        createdAt:result.createdAt,
                        updatedAt:result.updatedAt,
                        __v:result.__v
                    }
                    resultArray.push(resultObject);

                })
                res.json(resultArray);
            }
           
        });
});

router.get("/:id" ,  (req, res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    Articles.findById({"_id" :req.params.id }).populate("Comments").
    exec((err, result)=>{
        if(err){
            err.status = 500;
            return next(err);
        }
        res.status(200).json(result);
    })
});


router.post( '/', ( req, res, next ) => {
    const article = req.body;
    
    if( !article ) {
        const err = new Error( 'Article should be included in request body' );
        err.status = 403;
        return next( err );
    }

    Articles
        .create( article, ( err, savedArticle ) => {
            if( err ) {
                err.status = 500;
                return next( err );
            }

            res.status( 201 ).json( savedArticle );
        });
});

router.patch( '/:id', ( req, res, next ) => {
    const id = req.params.id;
    const article = req.body;

    if( !article ) {
        const err = new Error( 'Product should be included in request body' );
        err.status = 403;
        return next( err );
    }

    Articles.findByIdAndUpdate( id,  {$set:article} ,(err, updatedArticle)=>{
            if( err ) {
                err.status = 500;
                return next( err );
                
            }
            res.status( 200 ).json(updatedArticle);
        });
});

router.delete( '/:id', ( req, res, next ) => {
    const id = req.params.id;

    Articles
        .findByIdAndRemove( id )
        .exec(( err, deletedArticle ) => {
            if( err ) {
                err.status = 500;
                return next( err );
            }

            res.status( 204 ).json(deletedArticle);
            
        });
});

//add a comment
router.post("/:id/comments" , (req, res)=>{

    Articles.findById(req.params.id , (err, article)=>{
        if(err){
            res.status  = 500;
            return;
        }
        else{
            Comments.create(req.body , (err, comment)=>{
                if(err){
                    res.status = 500;
                    res.send(err);
                }else{
                    article.comments.push(comment);
                    article.save();
                    res.status(200).json(article);
                }
            });
        }
    });
});

module.exports = router;
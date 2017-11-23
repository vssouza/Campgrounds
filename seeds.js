var mongoose = require('mongoose'),
    Campground = require('./models/campground'),
    User = require("./models/user"),
    Comment = require("./models/comment");


var data = [
    {
        name: "Darklake Point",
        image: "https://farm2.staticflickr.com/1084/1331589629_006a8916a2.jpg",
        description: "Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker."
    },
    {
        name: "Salmon Creek",
        image: "https://farm5.staticflickr.com/4080/4938516049_eef5cbc734.jpg",
        description: "Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker."
    },
    {
        name: "Cloud's Rest",
        image: "https://farm5.staticflickr.com/4150/4832531195_9a9934b372.jpg",
        description: "Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker."
    },
    {
        name: "BlackRock Mountain",
        image: "https://farm5.staticflickr.com/4100/4798314980_bc31231984.jpg",
        description: "Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker."
    },
    {
        name: "Angry Bear Forest",
        image: "https://farm9.staticflickr.com/8421/7646826058_94f9e8e2f0.jpg",
        description: "Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker."
    },
    {
        name: "Flying Bird Rock",
        image: "https://farm4.staticflickr.com/3441/3800913815_d057e41157.jpg",
        description: "Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker."
    },

];

function seedDB(){
    
    //remove all campgrounds
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        }
        else {
            Comment.remove({}, function(err){
                if(err){
                    console.log(err)
                }
                else {
                    User.remove({}, function(err){
                        if(err) {
                            console.log(err);
                        }
//                        data.forEach(function(campground){
//                            Campground.create(campground, function(err, campground){
//                                if(err){
//                                    console.log(err);
//                                } else {
//                                    Comment.create({author: "Homer", text: "I wish we had internet here."}, function(err, comment){
//                                        if(err){
//                                            console.log(err);
//                                        }
//                                        else {
//                                            campground.comments.push(comment);
//                                            campground.save();
//                                        }
//                                    });
//                                }
//                            });
//                        });
                    });
                }
            });
        }
    });
    
}

module.exports = seedDB;
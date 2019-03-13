//
// Example of a conversation with a menu that loops until explicitly stopped
//
module.exports = function (controller) {

    controller.hears([/^libary/], 'direct_message,direct_mention', function (bot, message) {

        bot.startConversation(message, function (err, convo) {

            var question = "Here are a few proposed DevNet activities:";
            question += "<br/> `1)` EE438: Fundamentals of Circuit Lab (**EE438**)";
            question += "<br/> `2)` EE313: Linear Signals and Systems (**EE313**)";
            question += "<br/> `3)` EE325: Electromagnetics (**EE325**)";
            question += "<br/> `4)` EE325K: Probability (**EE325K**)";            
            question += "\n\nWhat do you want to check?<br/>_(type a number, a **bold keyword** or `stop`)_";
            convo.ask(question, [
                {
                    pattern: "1|EE438|ee438",
                    callback: function (response, convo) {
                        convo.gotoThread('menu_1');
                    },
                }
                , {
                    pattern: "2|EE313|ee313",
                    callback: function (response, convo) {
                        convo.gotoThread('menu_2');
                    },
                }
                , {
                    pattern: "3|EE325|ee325",
                    callback: function (response, convo) {
                        convo.gotoThread('menu_3');
                    },
                }
                , {
                     pattern: "4|EE325K|ee325k",
                    callback: function (response, convo) {
                        convo.gotoThread('menu_3');
                    },
                }
                , {                   
                    pattern: "cancel|stop",
                    callback: function (response, convo) {
                        convo.gotoThread('action_cancel');
                    },
                }
                , {
                    default: true,
                    callback: function (response, convo) {
                        convo.gotoThread('bad_response');
                    }
                }
            ]);

            // Menu option 1)
            convo.addMessage({
                text: "Excellent choice: let me take you to your book for [Fundamentals of Circuit Lab](http://www.opentextbooks.org.hk/system/files/export/9/9648/pdf/Fundamentals_of_Electrical_Engineering_I_9648.pdf)",
                action: 'default'
            }, 'menu_1');

            // Menu option 2)
            convo.addMessage({
                text: "Need to study [Linear and Systems](http://www.eng.ucy.ac.cy/cpitris/courses/ECE626/Notes/SignalsAndSystems.pdf)? You got it!",
                action: 'default'
            }, 'menu_2');
            
            // Menu option 3)
            convo.addMessage({
                text: "It seems like you do not have an ebook for this course. But here is the [website](https://www.khanacademy.org/science/physics/light-waves/modal/a/light-and-the-electromagnetic-spectrum) for you to practice",
                action: 'default'
            }, 'menu_3');
            
            // Menu option 4)
            convo.addMessage({
                text: "[Probability book] at your disposable boss! (https://books.google.com/books?id=1_jaeMHrxRwC&pg=PA10&lpg=PA10&dq=two+defective+are+mixed+up+two+good+ones.+The+tubes+are+tested,+one+by+one,+until+both+defectives+are+found&source=bl&ots=dNrX-IRy3N&sig=xJYvgu6uPUo7KnQjiZemKeXs2YE&hl=en&sa=X&ved=2ahUKEwjzqZjo07bdAhUHLa0KHdXvAuwQ6AEwAnoECAgQAQ#v=onepage&q=two%20defective%20are%20mixed%20up%20two%20good%20ones.%20The%20tubes%20are%20tested%2C%20one%20by%20one%2C%20until%20both%20defectives%20are%20found&f=false).",
                action: 'default'
            }, 'menu_4');

            // Cancel
            convo.addMessage({
                text: "Got it, cancelling...",
                action: 'stop', // this marks the converation as unsuccessful
            }, 'action_cancel');

            // Bad response
            convo.addMessage({
                text: "Sorry, I did not understand.",
                action: 'default',
            }, 'bad_response');

        });
    });
};

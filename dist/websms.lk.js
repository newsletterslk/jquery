/**
 * Websms.lk SMS Client 
 * Version : jQuery - JavaScript - V1
 * Copyright @ 2017 - 2020 websms.lk
 * Customer Service : +94-(0)11-4348585
 * Email : support@websms.lk
 */
(function(factory){
    if(typeof define === 'function' && define.amd){
        define(['jquery'], factory);
    }else if(typeof module === 'object' && module.exports){
        module.exports = function(root, jQuery){
            if(jQuery === undefined){
                if(typeof window !== 'undefined'){
                    jQuery = require('jquery');
                }
                else{
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    }else{
        factory(jQuery);
    }
}(function($){
    "use strict";
    $.WebSMSLK = function(options,option2){
        var settings = $.extend({
            apikey:"",
            apitoken:"",
            senderName:"WebSMS",
            msgType:"sms",
            country_code: "94",
            language:"",
            route:0,
            file:"",
            scheduledate:"",
            duration:"",
            webSMSurl:'https://app.newsletters.lk/smsAPI?',
        }, options );
        var msgs = $.extend({
            apiTokenMissing:"API TOKEN MISSING",
            apiKeyMissing: "API KEY MISSING",
            MMSFileMissing:"Target File Invalid",
            StatusFalied:"Messege can not send",
            EmptyMsg:"Empty Messeges",
            MobileNumberInvalid:"Invalid Mobile Number",
        }, option2 );
        var msgs=msgs;
        var settings=settings;
        return {
            SendSMS : function(number,text){
                if(number !=""){
                    if(text !=""){ 
                        var number_array=number.split("");
                        if(number_array[0]=="+"){
                            number_array=number_array.shift();
                            number=number_array.join();
                        }else{
                            if(number_array[0]=="0"){
                                number_array=number_array.slice(1);
                                number=settings.country_code+number_array.join("");
                            } 
                        } 
                        var param='sendsms&apikey='+settings.apikey+'&apitoken='+settings.apitoken+'&from='+settings.senderName+'&to='+number+'&type='+settings.msgType;if(settings.route != 0) { param=+'&route='.settings.route};
                         if(settings.msgType=="sms" || settings.msgType=="unicode"){
                            //SMS
                           param=param+'&text='+text;
                        }else if(settings.msgType=="voice" || settings.msgType=="mms"){
                            //Voice And MMS
                            if(settings.file){
                                param=param+'&text='+$TEXT+'&file='+settings.file;
                                if(settings.msgType=="voice" && settings.duration !=""){
                                    param=param+'&duration='+settings.duration;
                                }
                            }else{
                                return msgs.MMSFileMissing;
                            }
                        }else if(settings.msgType=="whatsapp"){
                            //WhatsAPP
                            param=param+'&text='+$TEXT;
                            if(settings.file){
                                param=param+'&file='+settings.file;
                            }
                        }else if(settings.msgType=="flash"){
                            //Flash
                            param=param+'&text='+$TEXT;
                            if(settings.file){
                                param=param+'&file='+settings.file;
                            }
                        } 
                        if(settings.scheduledate != ""){
                            param=param+'&scheduledate='+settings.scheduledate;
                        }
                        if(settings.language != ""){
                            param=param+'&language='+settings.language;
                        } 
                        const Http = new XMLHttpRequest();
                        const url=settings.webSMSurl+param;
                        Http.open("POST", url);
                        Http.send();
                        Http.onreadystatechange = (e) => {
                            return Http.responseText;
                            //Return will be JSON
                        }
                    }else{
                        return msgs.EmptyMsg;
                    }
                }else{
                    return msgs.MobileNumberInvalid;
                }
            }
        }
    }
    
}));
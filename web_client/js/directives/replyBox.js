var app = angular.module('InboxApp.directives');


app.directive("replybox", function() {
    return {

        restrict: 'E',
        transclude: true,
        scope: {
            sendButtonAction: '&sendButtonAction'
        }, // Two-way binding to message object
        controller: function($scope, $element, $attrs, $transclude) {

            var myBorderColor = '#E1E8E7';

            $scope.container_style = {

                paddingTop: '5px',
                paddingLeft: '10px',
                // paddingRight: '10px',

                paddingBottom: '10px',

                // position: 'absolute',
                // bottom: 3,
                // left: 0,
                minWidth: 538, // Depends on the number of buttons
            }

            $scope.reply_box_style = {
                color: '#333',
                textShadow: '1px 1px 1px white',

                marginBottom: '5px',
                marginTop: '5px',
                minHeight: '50px',
            };

            $scope.text_box_style = {

                paddingTop: '15px',
                paddingRight: '15px',
                paddingLeft: '15px',
                paddingBottom: '5px',

                minHeight: '36px'
            };


            $scope.bottom_button_bar = {
                backgroundColor: '#EEF2F2',
                borderTopWidth: '1px',
                borderTopStyle: 'solid',
                borderTopColor: myBorderColor,
                height: '33px'
            };

            // For all bottom buttons
            var button_styles = {
                fontFamily: '"proxima-nova-alt"',
                fontWeight: 600,
                fontSize: '13px',
                color: '#708080',
                lineHeight: '16px',
                paddingTop: '10px',
                float: 'left',
                height: '23px',
                cursor: 'pointer',
                paddingRight: '15px',
                paddingLeft: '35px',
                borderRightWidth: '1px',
                borderRightStyle: 'solid',
                borderRightColor: myBorderColor
            };


            $scope.add_file_button = {
                background: 'transparent url("img/addfiles_icon.png") no-repeat 13px 6px'
            };
            for (var attrname in button_styles) {
                $scope.add_file_button[attrname] = button_styles[attrname];
            }


            $scope.add_photos_button = {
                background: 'transparent url("img/addphotos_icon.png") no-repeat 11px 8px'
            };
            for (var attrname in button_styles) {
                $scope.add_photos_button[attrname] = button_styles[attrname];
            }


            $scope.add_event_button = {
                background: 'transparent url("img/addevent_icon.png") no-repeat 12px 8px'
            };
            for (var attrname in button_styles) {
                $scope.add_event_button[attrname] = button_styles[attrname];
            };

            $scope.send_money_button = {
                background: 'transparent url("img/sendmoney_icon.png") no-repeat 9px 6px'
            };
            for (var attrname in button_styles) {
                $scope.send_money_button[attrname] = button_styles[attrname];
            };


            $scope.send_button_style = {
                fontFamily: '"proxima-nova-alt-condensed"',
                fontWeight: 600,
                fontSize: '18px',
                color: '#4D7FBD',

                lineHeight: '16px',
                paddingTop: '10px',

                float: 'right',
                height: '23px',

                cursor: 'pointer',
                paddingRight: '20px',
                paddingLeft: '20px',
                borderLeftWidth: '1px',
                borderLeftStyle: 'solid',
                borderLeftColor: myBorderColor
            };

            $scope.internalSendButtonAction = function() {
                alert("Getting here at least");
            };


            $scope.messageText = "Hello world this is my message";

        },


        // <div ng-file-upload="/file_upload"
        // data-complete='uploadComplete()'
        //  data-error="uploadError()"></div>


        // #drop:hover, #drop.active {
        //     border: 2px dashed #08c;
        //     color: #08c;
        // }

        // * textarea {
        // *  resize: none;
        // *  word-wrap: break-word;
        // *  transition: 0.05s;
        // *  -moz-transition: 0.05s;
        // *  -webkit-transition: 0.05s;
        // *  -o-transition: 0.05s;
        // * }


        template: '<div id="reply_box" ng-style="container_style">' + '<div ng-style="reply_box_style" class="card_with_shadow">' +

        '<div id="drop">' +

        '<div auto-resize id="reply_textbox" class="resize_textbox" ng-style="text_box_style" contenteditable="true" hidefocus="true">' + 'Write a message&hellip;</div>' +

        '<form id="file-upload" style="display:none" method="post" action="/file_upload" enctype="multipart/form-data">' + '<input style="display:none" type="file" name="file" multiple />' + '</form>' +

        '<div ng-style="bottom_button_bar" >' +

        '<div id="add_file_button" ng-style="add_file_button" hover="#E0E3E3">Add Files</div>' +

        '<div id="add_file_button" ng-style="add_photos_button" hover="#E0E3E3">Add Photos</div>' +

        '<div id="add_file_button" ng-style="add_event_button" hover="#E0E3E3">Add Event</div>' +

        '<div id="add_file_button" ng-style="send_money_button" hover="#E0E3E3">Send Money</div>' +

        '<div id="send_button" ng-click="sendButtonHandler()" ng-style="send_button_style" hover="#E0E3E3">Send</div>' +

        '</div>' + '</div>' + '</div>' + '</div>',

        link: function(scope, elem, attrs, ctrl) {


            // TODO resize reply box as you type stuff in it
            // var obj = elem.find('#reply_textbox');
            // var update = function() {
            //     var scrollable = $('#right-scrollable');

            //     // scrollable.animate({
            //     //     scrollTop: 9999999
            //     // }, 'slow');


            //     scrollable.scrollTop = 9999999;
            //     // x = 0; //horizontal coord
            //     // y = document.height; //vertical coord
            //     // window.scroll(x, y);
            // };
            // obj.bind('keyup keydown keypress change', update);
            // // update();



            scope.sendButtonHandler = function() {
                var textbox = elem.find('#reply_textbox');

                scope.sendButtonAction({
                    message_text: textbox.html()
                });
            };


            var upload_file_button = elem.find('#add_file_button');
            upload_file_button.bind('click', function() {
                var input = elem.find('input')[0];
                input.click();
            });



            // Initialize the jQuery File Upload plugin
            $('#file-upload').fileupload({
                // This element will accept file drag/drop uploading
                dropZone: $('#drop'),

                // This function is called when a file is added to the queue;
                // either via the browse button, or via drag/drop:
                add: function(e, data) {
                    // var tpl = $('<li class="working"><input type="text" value="0" data-width="48" data-height="48"'+
                    //   ' data-fgColor="#0788a5" data-readOnly="1" data-bgColor="#3e4043" /><p></p><span></span></li>');

                    // // Append the file name and file size
                    // tpl.find('p').text(data.files[0].name)
                    //   .append('<i>' + $filter.humanBytes(data.files[0].size) + '</i>');

                    // // Add the HTML to the UL element
                    // data.context = tpl.appendTo(ul);

                    // // Initialize the knob plugin
                    // tpl.find('input').knob();

                    // // Listen for clicks on the cancel icon
                    // tpl.find('span').click(function(){
                    //   if(tpl.hasClass('working')){
                    //     jqXHR.abort();
                    //   }

                    //   tpl.fadeOut(function(){
                    //     tpl.remove();
                    //   });
                    // });

                    // Automatically upload the file once it is added to the queue
                    var jqXHR = data.submit();
                },

                done: function(e, data) {

                    scope.$apply(function(s) {
                        // Completion function handler
                        s.$eval(attrs.complete);

                        console.log("Done! With hash: " + data.result);

                    });
                },

                progress: function(e, data) {
                    // Calculate the completion percentage of the upload
                    var progress = parseInt(data.loaded / data.total * 100, 10);

                    // Update the hidden input field and trigger a change
                    // so that the jQuery knob plugin knows to update the dial

                    // data.context.find('input').val(progress).change();

                    console.log("Uploaded: " + progress)

                    if (progress == 100) {
                        // data.context.removeClass('working');
                        console.log("Working...")
                    }

                },

                fail: function(e, data) {
                    scope.$apply(function(s) {

                        console.log("Error uploading...")
                        console.log(e)
                        console.log(data)

                        s.$eval(attrs.error);
                    });

                    // data.context.addClass('error');
                }
            });


            // Prevent the default action when a file is dropped on the window
            $(document).on('dragover', function(e) {
                e.preventDefault();
                $('#drop').addClass('active');
            });

            $(document).on('drop dragleave', function(e) {
                e.preventDefault();
                $('#drop').removeClass('active');
            });


            // Do something when clicking into the box.

        } // end link

    };
});



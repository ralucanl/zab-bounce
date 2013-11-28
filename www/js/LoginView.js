var iabRef;
var LoginView = function(store) {
    this.render = function() {
        this.el.html(LoginView.template());
        return this;
    };
    this.initialize = function() {
        var _this = this;
        this.el = $('<div/>');
        this.el.on('click', '#login', function() {
            // LogFacebook();
            //app.showAlert(JSON.stringify(window.localStorage.getItem('accessToken')))

            //  FacebookInAppBrowser.login(loginSuccessCallback, loginUnknowErrorCallback, userIdCallback);
            FacebookInAppBrowser.logout(function() {
                alert('bye');
            });
        });


        this.el.on('click', '#user, #passw', function() {
            if ($(this).val() == "Username..." || $(this).val() == "Password...") {
                $(this).val("");
            } else {
                this.select();
            }
        });

        this.el.on('click', '.login_b', function() {
            app.dialog = new Dialog({title: "Login", type: "login", ok: "Login",
                events: [{
                        type: "click",
                        elem: "input",
                        exec: function(elem) {
                            var selem = $(elem.target);
                            if (selem.val() == "Username..." || selem.val() == "Password...") {
                                selem.val("");
                            } else {
                                selem.select();
                            }
                        }
                    }, {
                        type: "blur",
                        elem: "input",
                        exec: function(elem) {
                            var selem = $(elem.target);
                            if (!$.trim(selem.val()).length) {
                                if (selem.is("#user")) {
                                    selem.val("Username...");
                                } else {
                                    selem.val("Password...");
                                }
                            }
                        }
                    }],
                onOk: function() {
                    var usern = $.trim($('#user').val()), passw = $.trim($('#passw').val());
                    if (usern.length && passw.length) {
                        $.ajax({
                            type: "POST",
                            dataType: "json",
                            url: "http://bounce.dev.nextlogic.ro/zaboca/login",
                            data: {"username": usern, "password": passw, "service_login": "zaboca"},
                            success: function(resp) {
                                if (resp.success) {
                                    app.logged = true;
                                    app.dialog.close();
                                    app.homePage = new HomeView({id: resp.id, email: resp.email}).render();
                                    app.slidePage(app.homePage);
                                } else {
                                    app.logged = false;
                                    app.dialog.close();
                                    app.dialog = new Dialog({title: "Error", type: "text", text: resp.error}).render();
                                    $('#login-zaboca-main_dialog').html(app.dialog.el);
                                }
                            }
                        })
                    }
                }, cancel: "Cancel"}).render();
            $('#login-zaboca-main_dialog').html(app.dialog.el);

            //_this.el.find('.login-content').html(_this.loginZabocaTpl());
        })
        this.el.on('click', '.register_b', function() {
            app.dialog = new Dialog({title: "Register", type: "register", ok: "Register",
                events: [{
                        type: "click",
                        elem: "input[def]",
                        exec: function(elem) {
                            var selem = $(elem.target);
                            if (selem.val() == selem.attr("def")) {
                                selem.val("");
                            } else {
                                selem.select();
                            }
                        }
                    }, {
                        type: "click",
                        elem: ".small_img",
                        exec: function(elem) {
                            $.ajax({
                                type: "POST",
                                dataType: "json",
                                url: "http://bounce.dev.nextlogic.ro/zaboca/register_avatar",
                                success: function(resp) {
                                    if (resp.success) {
                                        if (resp.avatars.length) {
                                            var xmldata = [];
                                            for (var i in resp.avatars) {
                                                xmldata.push("<img style='width:4em;height:4em;margin: 0.1em;' src='"+resp.avatars[i].file_path+"' avid='"+resp.avatars[i].avatar_id+"'/>")
                                            }
                                            app.popup.open({content: xmldata.join(""), title: "Zaboca", onOpen: function(){
                                                    app.popup.find("img").on("click", function(){
                                                        app.popup.find("img").each(function(){
                                                            $(this).removeAttr("sel").css({border:"none"})
                                                        })
                                                        $(this).attr("sel").css({border:"border: 0.1em inset green;"})
                                                    })
                                                }, onOk: function(){
                                                    //if(app.popup.find("img[sel]"))
                                                }
                                            });
                                        } else app.popup.open({text: "No avatars were received from server!", title: "Zaboca"});
                                    }
                                    console.log(resp)
                                }
                            })
                        }
                    },
                    {
                        type: "click",
                        elem: ".wopen span",
                        exec: function(elem) {
                            window.open($(elem.target).parent().attr("ref"), '_blank', 'location=yes');
                        }
                    }, {
                        type: "blur",
                        elem: "input",
                        exec: function(elem) {
                            var selem = $(elem.target);
                            if (!$.trim(selem.val()).length) {
                                selem.val(selem.attr("def"));
                            }
                        }
                    }],
                onOk: function() {
                    var rdata = {};
                    app.dialog.el.find('input').each(function(id, el) {
                        var elem = $(el), err;
                        if (elem.attr("rid")) {
                            if (elem.attr("def") && $.trim(elem.val()) != elem.attr("def")) {
                                rdata[elem.attr("rid")] = elem.val();
                            }
                        }
                    })
                    rdata['gender'] = app.dialog.el.find('input[name="gender"]:checked').val();
                    if (!rdata['fname'] || !rdata['fname'].length) {
                        app.popup.open({text: "Please enter your real name!", title: "Zaboca"});
                        return;
                    }
                    if (!rdata['email'] || !rdata['email'].length) {
                        app.popup.open({text: "Please enter an email address!", title: "Zaboca"});
                        return;
                    } else if (!check_valid_email(rdata['email'])) {
                        app.popup.open({text: "Email address is invalid!", title: "Zaboca"});
                        return;
                    }
                    if (!rdata['usern'] || !rdata['usern'].length) {
                        app.popup.open({text: "Please enter a valid username!", title: "Zaboca"});
                        return;
                    }
                    if (!rdata['passw'] || !rdata['passw'].length) {
                        app.popup.open({text: "Please enter a password!", title: "Zaboca"});
                        return;
                    } else if (!check_valid_password(rdata['passw'])) {
                        app.popup.open({text: "Password is invalid!\n must be at least six characters;\n"
                                    + " must contain only letters or numbers;\n"
                                    + " must contain at least one letter.", title: "Zaboca"});

                        return;
                    } else if (rdata['passw'] == rdata['fname'] || rdata['passw'] == rdata['lname'] || rdata['passw'] == rdata['email'] || rdata['passw'] == rdata['usern']) {
                        app.popup.open({text: "Please enter a password different from :First Name, Last Name, Email and Username!", title: "Zaboca"});
                        return;
                    }
                    if (rdata['email'] != app.dialog.el.find('input[r_id="conf_email"]').val()) {
                        app.popup.open({text: "Email fields don't match!", title: "Zaboca"});
                        return;
                    }
                    if (rdata['passw'] != app.dialog.el.find('input[r_id="conf_passw"]').val()) {
                        app.popup.open({text: "Password fields don't match!", title: "Zaboca"});
                        return;
                    }
                    if (!app.dialog.el.find('input[test="is_checked"]').is(":checked")) {
                        app.popup.open({text: "Please read Terms of Agreement, and check it.", title: "Zaboca"});
                        return;
                    }
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: "http://bounce.dev.nextlogic.ro/zaboca/register",
                        data: {"first_name": rdata['fname'], "last_name": rdata['lname'], "gender": rdata['gender'], "avatar": rdata['avatar'], "email": rdata['email'], "username": rdata['usern'], "password": rdata['passw'], "service_login": "zaboca"},
                        success: function(resp) {
                            if (resp.success) {
                                app.logged = true;
                                app.dialog.close();
                            } else {
                                app.logged = false;
                                app.popup.open({text: resp.error, title: "Zaboca"});
                            }
                        }
                    })
                }, cancel: "Cancel"}).render();
            $('#login-zaboca-main_dialog').html(app.dialog.el);
        })
        this.el.on('click', '.login_f', function() {
            var my_client_id = "1409538175948523",
                    my_redirect_uri = "http://jq.nextlogic.ro/test/flogged/", // "http://bounce.dev.nextlogic.ro/zaboca/", // "https://www.facebook.com/connect/login_success.html"
                    my_display = "touch";
            var authorize_url = "https://graph.facebook.com/oauth/authorize?";
            authorize_url += "client_id=" + my_client_id;
            authorize_url += "&redirect_uri=" + my_redirect_uri;
            authorize_url += "&display=" + my_display;
            iabRef = window.open(authorize_url, '_blank', 'location=no');
        })
    };
    this.initialize();
}
LoginView.template = Handlebars.compile([
    // '    <div class="header"><h1>Login</h1></div>',
    '    <div class="content login-content">',
    '   <div class="z_logo"><img src="css/images/login/zaboca111.png"></div>',
    '   <div class="login_f"><img src="css/images/login/fb_button.png"/></div>',
    '   <div class="login_t"><img src="css/images/login/twitt_button.png"/></div>',
    '   <div class="register_b"><img src="css/images/login/register_button.png"/></div>',
    '   <div class="login_b"><img src="css/images/login/login_button.png"/></div>',
    '   </div>',
    '    <script id="login-zaboca-tpl" type="text/x-handlebars-template"></script>'
].join(""));

//LoginView.loginZabocaTpl = undefined;

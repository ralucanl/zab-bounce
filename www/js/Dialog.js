var Dialog = function(store) {
    this.render = function() {
        this.el.html(Dialog.template(store));
       
        return this;
    };
    this.unbind_events = function() {
        this.el.off('.dial');
    }
    this.initialize = function() {
        var _this = this;
        this.el = $('<div class="light-dialog"/>');
        if (store.events) {
            for (var i in store.events) {
                this.el.on(store.events[i].type + '.dial', store.events[i].elem, $.proxy(store.events[i].exec, this))
            }
        }
        this.el.on('click.dial', '#ok', function() {
            if (store.onOk) {
                store.onOk();
                //_this.el.remove();
            }
        });
        this.el.on('click.dial', '#cancel', function() {
            if (store.onCancel) {
                store.onCancel()
            }
            _this.el.remove();
        });
    };

    this.close = function() {
        this.el.remove();
    }

    this.initialize();
}

Dialog.template = Handlebars.compile([
    '   <div class="dialbody">',
    '       <div class="header"><h1>{{this.title}}</h1></div>',
    '       <div class="content">',
    '           {{#ifCond this.type "login"}}',
    '               <div class="login-content login">',
                    '    <div>Username <input value="Username..." id="user"/></div>',
                    '    <div>Password <input value="Password..." id="passw"/></div>',
                    '</div>',
    '           {{/ifCond}}',
    '            {{#ifCond this.type "register"}}',
    '               <div class="login-content login">',
                    '    <div><div class="register_avatar"><img src="./css/images/login/user_default.png" class="user_img"> ', 
                            '<img src="./css/images/login/icon_choose_avatar.png"/ class="small_img"> <span class="ch_text">Choose Bounce Avatar</span>',
                         '</div></div>',
                    '    <div><input value="Enter your first name" def="Enter your first name" rid="fname"/></div>',
                    '    <div><input value="Enter your last name" def="Enter your last name" rid="lname"/></div>',
                    '    <div><input value="Enter your email" def="Enter your email" rid="email"/></div>',
                    '    <div><input value="Confirm your email" def="Confirm your email" r_id="conf_email"/></div>',
                    '    <div><input value="Enter your username" def="Enter your username" rid="usern"/></div>',
                    '    <div><input value="Enter your password" def="Enter your password" rid="passw"/></div>',
                    '    <div><input value="Confirm your password" def="Confirm your password" r_id="conf_passw"/></div>',
                    '    <div><div class="radio_group">',
                    '       <input type="radio" name="gender" value="male" rid="gender">Male<br/>',
                    '       <input type="radio" name="gender" value="female" rid="gender">Female<br/>',
                    '       <input type="radio" name="gender" value="unknown" rid="gender" checked>Not Specified',
                    '       </div>',
                    '       <div><div class="wopen" ref="terms_conditions/terms_of_use_privacy_policy.html">Privacy Policy</div></div>',
                    '       <div><div class="wopen" ref="terms_conditions/third_party_policies.html"><span>Terms of Agreement</span><input type="checkbox" test="is_checked"/></div></div>',
                    '</div>',
                    '</div>',
    '             {{/ifCond}}',
    
    '           {{#ifCond this.type "text"}}',
    '               <div class="login-content">',
    '                   <div>{{this.text}}</div>',
    '               </div>',
    '           {{/ifCond}}',
    '     </div>',
    '     <div class="dial_buttons">',
    '{{#if this.okButton}}',
    '<div id="ok" class="button">{{#if this.ok}} {{this.ok}} {{else}} OK {{/if}}</div>',
    '{{else}}',
    '{{#if this.ok}}<div id="ok" class="button"> {{this.ok}} </div>{{/if}}',
    '{{/if}}',
    '<div id="cancel" class="button">{{#if this.cancel}} {{this.cancel}} {{else}}Cancel{{/if}}</div>',
    '      </div>',
    '</div>'
].join(""));
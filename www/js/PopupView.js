var PopupView = function() {
    this.render = function(store) {
        var _this = this;
        this.el.html(PopupView.template(store));
        if(store.content){
            this.el.find(".content").html(store.content);
        }
        if(store.onOpen){
            store.onOpen();
        }
        this.el.on('click', '.ok_b', function() {
            if(store.onOk){
                store.onOk()
            }
            _this.close();
        })
        return this;
    };
    this.initialize = function() {
        var _this = this;
        this.el = $('<div class="light-dialog"/>');
        
        this.el.hide();
    };
    this.close = function(){
        this.el.empty();
        this.el.hide();
    }
    this.open = function(store){
        this.render(store);
        this.el.show();
    }
    this.initialize();
}
PopupView.template = Handlebars.compile([
    '<div class="popup_content">',
    '    <div class="header"><h1>{{this.title}}</h1></div>',
    '    <div class="content">',
    '    {{#if this.text}}',
    '       <div> {{this.text}}</div>',
    '    {{/if}}',
    '   </div>',
    '     <div class="dial_buttons">',
    '       <div class="ok_b button"> OK </div>',
    '   </div>',
    '</div>'
].join(""));
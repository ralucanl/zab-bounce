var HomeView = function(store) {
    this.render = function() {
        this.el.html(HomeView.template(store));
        return this;
    };
    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        //    this.el.on('keyup', '.search-key', $.proxy(this.findByName, this));
        this.el.on('click', '.search-key', function() {
            this.select();
        });
        this.el.on('click', '#logout_b', function(){
            app.logged = false;
            app.loginPage = new LoginView().render();
            app.slidePage(app.loginPage);
        })
    };
    this.initialize();
}

HomeView.template = Handlebars.compile([
    '    <div class="header"><h1>Welcome {{this.email}}</h1> <div id="logout_b">Logout</div></div>',
    '    <div class="search-bar"><input class="search-key" type="text"/></div>',
].join(""));
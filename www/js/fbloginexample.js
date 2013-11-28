// Settings

    FacebookInAppBrowser.settings.appId = '1409538175948523';
    FacebookInAppBrowser.settings.redirectUrl = 'http://bounce.dev.nextlogic.ro/zaboca/';
    FacebookInAppBrowser.settings.permissions = 'email';

// Login(accessToken will be stored trough localStorage in 'accessToken');
    var loginSuccessCallback = function() {
        
        app.showAlert(window.localStorage.getItem('accessToken'));
    },
            loginUnknowErrorCallback = function() {
        alert('Do you want to try again?');
    },
            userIdCallback = function() {
        // after the login is finished the getInfo() function is called in order to store the user id
        // if you want to do something with the user id right after we have it, use this third callback
        console.log(window.localStorage.getItem('uid'));
    };

  /*  FacebookInAppBrowser.login(loginSuccessCallback, loginUnknowErrorCallback, userIdCallback);

// Invite friends
    FacebookInAppBrowser.invite('Get to know my app!', function(response) {
        if (response) {
            alert('success');
        }
    });

// Same logic of callbacks
    FacebookInAppBrowser.getInfo(function(response) {
        if (response) {
            var name = response.name,
                    id = response.id,
                    gender = response.gender;
            // check the response object to see all available data like email, first name, last name, etc
            console.log(response);
        }
    });

    FacebookInAppBrowser.getPermissions(function(permissions) {
        if (permissions) {
            console.log(permissions.publish_actions, permissions);
        }
    });

// Logout
    FacebookInAppBrowser.logout(function() {
        alert('bye');
    });*/
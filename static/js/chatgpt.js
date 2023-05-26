$(document).ready(function () {
    let reportdeskemail = sessionStorage.getItem('reportdeskemail');
    if (reportdeskemail != null) {

        $(".wrapper").hide();
        $("#userprofileid").val(reportdeskemail);



        $(".user_info").append('<h6>' + reportdeskemail + '</h6><p><span class="online_animation"></span> Online</p>')
        var formData = new FormData();

        userprofileid = sessionStorage.getItem('reportdeskemail');
        formData.append('question', $('#exampleFormControlTextarea1').val());
        formData.append('email', userprofileid);


        $.ajax({
            url: '/fetchhistory',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {


                $.each(data, function (index, value) {

                    console.log(data);
                    $('#questionappend').append('<li><a href="#"> <span>' + value[1] + '</span></a></li>');

                });
            }
        });
    } else {
        $(".wrapper").show();
        $(".question").hide()
        $(".answer").hide()
        $('#exampleFormControlTextarea1').prop('readonly', true);

        $(".user_info").append('<h6>' + "User" + '</h6><p><span class="offline_animation"></span> Offline</p>')
    }



});
$(document).ready(function () {
    $("#searchq").click(function () {

        $('#questionappend').append('<li><a href="#"> <span>' + $('#exampleFormControlTextarea1').val() + '</span></a></li>');
        $('#gptbody').append('<div class="footer question"><p>' + $('#exampleFormControlTextarea1').val() + '</p></div>');

        var formData = new FormData();

        userprofileid = sessionStorage.getItem('reportdeskemail');
        formData.append('question', $('#exampleFormControlTextarea1').val());
        formData.append('email', userprofileid);
        $('#exampleFormControlTextarea1').prop('readonly', true);


        $.ajax({
            url: '/anser',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {


                $('#gptbody').append('<div class="footer answer"><p>' + data + '</p></div>');
                $('#exampleFormControlTextarea1').val("")
                $('#exampleFormControlTextarea1').prop('readonly', false);

            }
        });
    });
});

$(document).ready(function () {
    $("#signupformsubmit").click(function () {

        // Get session data
        var email = sessionStorage.getItem('reportdeskemail');
        if (email != null) {
            console.log("User Exits Please login");
        } else {

            sessionStorage.setItem('reportdeskemail', $('#signupemail').val());

            var formData = new FormData();

            formData.append('email', $('#signupemail').val());
            formData.append('password', $('#signuppassword').val());
            formData.append('name', $('#signupname').val());
            formData.append('phone', $('#signupphone').val());
            formData.append('Orgnization', $('#Orgnization').val());



            $.ajax({
                url: '/saveCustomer',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {
                    $("#userprofileid").val(reportdeskemail);
                    alert(data)
                    $(".wrapper").hide();
                    $(".question").show()
                    $(".answer").show()
                    $('#exampleFormControlTextarea1').prop('readonly', false);
                    console.log()
                    $.each(data, function (index, value) {

                        console.log(data);
                        $('#questionappend').append('<li><a href="#"> <span>' + value[1] + '</span></a></li>');

                    });

                }
            });
        }
    });
});


$(document).ready(function () {
    $("#signinformsubmit").click(function () {

        // Get session data
        var email = sessionStorage.getItem('email');
        if (email != null) {
            console.log("User Exits");
        } else {

            sessionStorage.setItem('reportdeskemail', $('#signinemail').val());
        }


        var formData = new FormData();


        formData.append('email', $('#signinemail').val());
        formData.append('password', $('#signinepassword').val());


        $.ajax({
            url: '/signin',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                $("#userprofileid").val(reportdeskemail);
                alert(data)
                $(".wrapper").hide();
                $(".question").show()
                $(".answer").show()
                $('#exampleFormControlTextarea1').prop('readonly', false);
                $.each(data, function (index, value) {

                    console.log(data);
                    $('#questionappend').append('<li><a href="#"> <span>' + value[1] + '</span></a></li>');

                });
            }
        });
    });
});


$(document).ready(function () {
    // Get Data

    $.ajax({
        url: 'https://5b87-103-113-65-56.ngrok-free.app/allquestion',
        type: 'GET',
        headers: {

            'Access-Control-Allow-Origin': '*'
        },
        success: function (response) {
            alert(response);
        },
        error: function (error) {
            console.log(error);
        }
    });


});
//SighUp JS
const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = (() => {
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (() => {
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
});
signupLink.onclick = (() => {
    signupBtn.click();
    return false;
});


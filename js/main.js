function getCountries() {
    $.ajax({
        type: "GET",
        url: staging + "cross_border_treatments/countries?lang=" + language,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (e, t, n) {
            $.each(e.cross_border_treatment_countries, function (e, t) {
                $("#countries").append("<option value=" + t.country_code + ">" + t.country + "</option>")
            })
        },
        error: function (e, t) {
        }
    })
}

function getSpecialities() {
    $.ajax({
        type: "GET",
        url: staging + "treatments_groups?lang=" + language,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (e, t, n) {
            $.each(e.treatments_groups, function (e, t) {
                $("#treatment_group").append("<option value=" + t.id + ">" + t.name + "</option>")
            })
        },
        error: function (e, t) {
        }
    })
}

production = "https://admin.balsamee.com/api/v5/", staging = "https://817100e4.ngrok.io/api/v5/", devlopment = "http://localhost:3000/api/v5/", language = $("#language").val(), $(document).ready(function () {
    $("#telephone_number").intlTelInput({
        utilsScript: "js/utils.js",
        autoPlaceholder: "aggressive",
        formatOnDisplay: !0,
        geoIpLookup: function (e) {
            $.get("https://ipinfo.io", function () {
            }, "jsonp").always(function (t) {
                var n = t && t.country ? t.country : "";
                e(n)
            })
        },
        initialCountry: "auto",
        customPlaceholder: function (e, t) {
            return e
        }
    }), getSpecialities(), getCountries(), $("#submit").click(function () {
        $(".input-errors").remove(), name = $("#name").val(), email = $("#email").val(), details = $("#details").val(), treatment_group_id = $("#treatment_group").val(), country = $("#countries").val(), phone = $("#telephone_number").intlTelInput("getNumber");
        var e = {
            name: name,
            email: email,
            form_type: "cross_border_treatment_request",
            telephone_number: phone,
            diagnosis: details,
            country: country,
            treatment_group_id: treatment_group_id,
            request_type: "campaign_request"
        };
        $.ajax({
            type: "POST",
            url: staging + "cross_border_treatment_requests?lang=" + language,
            data: JSON.stringify({cross_border_treatment: e}),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (e, t, n) {
                $(".input-errors").remove(), "en" == language ? window.location.replace("./success-msg.html") : window.location.replace("./success-msg-ar.html")
            },
            error: function (e, t, n) {
                $.each(e.responseJSON.errors, function (e, t) {
                    $("#" + e).after("<small class='text-danger input-errors'>" + t + "</small>")
                })
            }
        })
    })
}), $(window).scroll(function () {
    $(window).scrollTop() >= 50 ? ($("#mainhead").addClass("fixed-header"), $("#mainhead").css("display", "none")) : ($("#mainhead").removeClass("fixed-header"), $("#mainhead").css("display", "block"))
});

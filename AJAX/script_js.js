function loadData() {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "data.php", true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);

            document.getElementById("result").innerHTML =
                "<div class='info-item'><span class='label'>Name:</span> " + data.name + "</div>" +
                "<div class='info-item'><span class='label'>Age:</span> " + data.age + "</div>" +
                "<div class='info-item'><span class='label'>City:</span> " + data.city + "</div>" +
                "<div class='info-item'><span class='label'>Email:</span> " + data.email + "</div>" +
                "<div class='info-item'><span class='label'>Phone:</span> " + data.phone + "</div>" +
                "<div class='info-item'><span class='label'>Country:</span> " + data.country + "</div>" +
                "<div class='info-item'><span class='label'>Occupation:</span> " + data.occupation + "</div>" +
                "<div class='info-item'><span class='label'>Skills:</span> " + data.skills.join(", ") + "</div>" +
                "<div class='info-item'><span class='label'>Education:</span> " + data.education.degree + " - " + data.education.university + "</div>";
        }
    };

    xhr.send();
}
var dayCounter = 0;
var activityCounter = [0,0,0]

function addDay() {
    var dayDiv = document.createElement("div");
    dayDiv.setAttribute("class", "card")

    var cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "card-body");
    cardDiv.setAttribute("id", "act" + dayCounter.toString());
    dayDiv.appendChild(cardDiv);

    var title = document.createElement("h2");
    var titleText = document.createTextNode("Día " + (dayCounter+1).toString());
    title.appendChild(titleText);
    title.setAttribute("class", "card-title");
    cardDiv.appendChild(title);


    var actBut = document.createElement("button"); 
    var buttonText = document.createTextNode("Añadir actividad")
    actBut.appendChild(buttonText);
    actBut.setAttribute("class", "btn btn-secondary");
    actBut.setAttribute("id", dayCounter);
    actBut.setAttribute("onClick", "addActivity(this.id);");
    actBut.setAttribute("type", "button");
    cardDiv.appendChild(actBut);

    dayCounter++;

    var parent = document.getElementsByTagName("form")[0];
    parent.insertBefore(dayDiv, parent.lastElementChild);
    if (dayCounter >= 3) {
        document.getElementById("day").remove()
    }
}

function addActivity(id) {

    var actDiv = document.createElement("div");
    actDiv.setAttribute("class", "card");

    var cardDiv2 = document.createElement("div");
    cardDiv2.setAttribute("class", "card-body");
    actDiv.appendChild(cardDiv2);

    var titleAct = document.createElement("h2");
    var titleActText = document.createTextNode("Actividad " + (activityCounter[id]+1).toString());
    titleAct.appendChild(titleActText);
    titleAct.setAttribute("class", "card-title");
    cardDiv2.appendChild(titleAct);

    var titleFieldDiv = document.createElement("div");
    titleFieldDiv.setAttribute("class", "form-group");
    var titleLabel = document.createElement("label");
    titleLabel.appendChild(document.createTextNode("Título"));
    titleLabel.setAttribute("class", "col-form-label");
    titleLabel.setAttribute("for", "activity-title");
    titleFieldDiv.appendChild(titleLabel);
    var titleInput = document.createElement("input");
    titleInput.setAttribute("class", "form-control");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("id", "activity-title");
    titleInput.setAttribute("formControlName", "title" + id.toString() + "_" + activityCounter[id].toString())
    titleFieldDiv.appendChild(titleInput);

    var descFieldDiv = document.createElement("div");
    descFieldDiv.setAttribute("class", "form-group");
    var descLabel = document.createElement("label");
    descLabel.appendChild(document.createTextNode("Descripción"));
    descLabel.setAttribute("class", "col-form-label");
    descLabel.setAttribute("for", "activity-description");
    descFieldDiv.appendChild(descLabel);
    var descInput = document.createElement("textarea");
    descInput.setAttribute("class", "form-control");
    descInput.setAttribute("rows", "3");
    descInput.setAttribute("id", "activity-description");
    descInput.setAttribute("formControlName", "description" + id.toString() + "_" + activityCounter[id].toString())
    descFieldDiv.appendChild(descInput);

    cardDiv2.appendChild(titleFieldDiv);
    cardDiv2.appendChild(descFieldDiv);

    var parent = document.getElementById("act" + id.toString());
    parent.insertBefore(actDiv, parent.lastElementChild);

    activityCounter[id]++;

    if (activityCounter[id] >= 3) {
        document.getElementById(id).remove();
    }
    
}


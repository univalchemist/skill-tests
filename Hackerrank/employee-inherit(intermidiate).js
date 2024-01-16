function Employee(title) {
    this.title = title;
}

Employee.prototype.setTitle = function(newTitle) {
    this.title = newTitle;
};

Employee.prototype.getTitle = function() {
    return this.title;
}

function Engineer(title, isManager) {
    Employee.call(this, title);
    this.isManager = isManager;
}
Engineer.prototype = Object.create(Employee.prototype);
Engineer.prototype.constructor = Engineer;
Engineer.prototype.setIsManager = function(newIsManager) {
    this.isManager = newIsManager;
}
Engineer.prototype.getIsManager = function() {
    return this.isManager;
}

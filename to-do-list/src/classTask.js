export class Task {
    constructor(id, name, isChecked = false) {
        this.id = id;
        this.name = name;
        this.isChecked = isChecked;
    }
}
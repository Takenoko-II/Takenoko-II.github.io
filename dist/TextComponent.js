export class TextComponent {
    constructor(content) {
        this.contentValue = "";
        this.contentColor = "black";
        this.isUnderlined = false;
        this.underlineColor = "black";
        this.fontSize = "16px";
        this.elements = [];
        this.contentValue = content;
    }
    setTextColor(color) {
        this.contentColor = color;
        this.elements.forEach(element => element.contentColor = color);
        return this;
    }
    setUnderline(color) {
        this.isUnderlined = true;
        this.underlineColor = color;
        this.elements.forEach(element => {
            element.underlineColor = color;
            element.isUnderlined = true;
        });
        return this;
    }
    setFontSize(size) {
        this.fontSize = size;
        return this;
    }
    append(element) {
        this.elements.push(element);
        return this;
    }
    createSpanElement() {
        const element = document.createElement("span");
        element.textContent = this.contentValue;
        element.style.color = this.contentColor;
        element.style.fontSize = this.fontSize;
        if (this.isUnderlined) {
            element.style.textDecoration = "underline " + this.underlineColor;
        }
        return element;
    }
    build() {
        const element = document.createElement("span");
        element.append(this.createSpanElement(), ...this.elements.map(_ => _.createSpanElement()));
        return element;
    }
    static new(text) {
        return new this(text);
    }
    static empty() {
        return new this("");
    }
}

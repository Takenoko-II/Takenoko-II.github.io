export class TextComponent {
    private contentValue: string = "";

    private contentColor: string = "black";

    private isUnderlined: boolean = false;

    private underlineColor: string = "black";

    private fontSize: string = "16px";

    private readonly elements: TextComponent[] = [];

    private constructor(content: string) {
        this.contentValue = content;
    }

    public setTextColor(color: string) {
        this.contentColor = color;
        this.elements.forEach(element => element.contentColor = color);
        return this;
    }

    public setUnderline(color: string) {
        this.isUnderlined = true;
        this.underlineColor = color;
        this.elements.forEach(element => {
            element.underlineColor = color;
            element.isUnderlined = true;
        });

        return this;
    }

    public setFontSize(size: string): TextComponent {
        this.fontSize = size;
        return this;
    }

    public append(element: TextComponent): TextComponent {
        this.elements.push(element);
        return this;
    }

    private createSpanElement(): HTMLSpanElement {
        const element: HTMLSpanElement = document.createElement("span");
        element.textContent = this.contentValue;
        element.style.color = this.contentColor;
        element.style.fontSize = this.fontSize;
        
        if (this.isUnderlined) {
            element.style.textDecoration = "underline " + this.underlineColor;
        }

        return element;
    }

    public build(): HTMLSpanElement {
        const element: HTMLSpanElement = document.createElement("span");
        element.append(this.createSpanElement(), ...this.elements.map(_ => _.createSpanElement()));

        return element;
    }

    public static new(text: string): TextComponent {
        return new this(text);
    }
}

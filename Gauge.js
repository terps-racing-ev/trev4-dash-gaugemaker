export default class Gauge {
    constructor(data) {
        this.data = data;

        if (data.box_xywh && data.box_xywh.length === 4) {
            this.x = Number(data.box_xywh[0]);
            this.y = Number(data.box_xywh[1]);
            this.width = Number(data.box_xywh[2]);
            this.height = Number(data.box_xywh[3]);
        } else {
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
        }

    }

    contains(px, py) {
        return (
            px >= this.x &&
            px <= this.x + this.width &&
            py >= this.y &&
            py <= this.y + this.height
        );
    }

    draw(ctx) {
    ctx.fillStyle = `rgba(${this.data.box_color[0]}, ${this.data.box_color[1]}, ${this.data.box_color[2]}, 1)`;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.strokeStyle = `rgba(${this.data.border_color[0]}, ${this.data.border_color[1]}, ${this.data.border_color[2]}, 1)`;
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "14px Arial";
    ctx.fillStyle = `rgba(${this.data.text_color[0]}, ${this.data.text_color[1]}, ${this.data.text_color[2]}, 1)`;

    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;

    const text = this.data.label + this.type(this.data.type);


    ctx.save();
    ctx.translate(centerX, centerY);

    if(this.height >= this.width* 2 && ctx.measureText(text).width > this.width)
         ctx.rotate(-Math.PI / 2);

    ctx.fillText(text, 0, 0);
    ctx.restore();
}


    type(type) {
        switch (type) {
            case "Simple Gauge":
                return " | S";
            case "Signed Linear Gauge":
                return " | L";
            case "Label":
                return "";
            default:
                return null;
        }
    }
}
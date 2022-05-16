canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const A = { x: 200, y: 150 };
const B = { x: 150, y: 250};
const C = { x: 50, y: 100 };
const D = { x: 250, y: 200 };

const ctx = canvas.getContext("2d");
const mouse = { x: 0, y: 0 };

document.onmousedown = (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
};

animate();

function animate() {
    A.x = mouse.x;
    A.y = mouse.y;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(A.x, A.y);
    ctx.lineTo(B.x, B.y);
    ctx.moveTo(C.x, C.y);
    ctx.lineTo(D.x, D.y);
    ctx.stroke();
    drawDot(A, "A");
    drawDot(B, "B");
    drawDot(C, "C");
    drawDot(D, "D");

    const I = getIntersection(A, B, C, D);
    if (I) {
        drawDot(I, "I");
    }

    requestAnimationFrame(animate);
}

function getIntersection(A, B, C, D) {
    const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
    const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
    const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);
    if (bottom != 0) {
        const t = tTop / bottom;
        const u = uTop / bottom;
        if (t >= 0 && t <= 1 && u >= 0 &&  u <= 1) {
            return {
                x: lerp(A.x, B.x, t),
                y: lerp(A.y, B.y, t),
                offset: t
            };        
        }
    }
    return null;
}



function lerp(A, B, t) {
    return A + (B - A) * t;
}



function drawDot(point, label, isRed) {
    ctx.beginPath();
    ctx.fillStyle = isRed ? "red" : "white";
    ctx.arc(point.x, point.y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 14px Arial";
    ctx.fillText(label, point.x, point.y);
    
}

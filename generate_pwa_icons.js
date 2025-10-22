const fs = require('fs');
const { createCanvas } = require('canvas');

const createIcon = (size) => {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#D97706');
    gradient.addColorStop(1, '#EA580C');
    
    ctx.fillStyle = gradient;
    const radius = size * 0.215;
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(size - radius, 0);
    ctx.arcTo(size, 0, size, radius, radius);
    ctx.lineTo(size, size - radius);
    ctx.arcTo(size, size, size - radius, size, radius);
    ctx.lineTo(radius, size);
    ctx.arcTo(0, size, 0, size - radius, radius);
    ctx.lineTo(0, radius);
    ctx.arcTo(0, 0, radius, 0, radius);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    const crossW = size * 0.25;
    const crossH = size * 0.69;
    ctx.fillRect(size/2 - crossW/2, size * 0.156, crossW, crossH);
    ctx.fillRect(size * 0.375, size * 0.469 - crossW/2, size * 0.25, crossW);
    
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = size * 0.0078;
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    ctx.moveTo(size * 0.5, size * 0.234);
    ctx.lineTo(size * 0.566, size * 0.234);
    ctx.lineTo(size * 0.566, size * 0.430);
    ctx.lineTo(size * 0.703, size * 0.430);
    ctx.lineTo(size * 0.5, size * 0.742);
    ctx.lineTo(size * 0.5, size * 0.570);
    ctx.lineTo(size * 0.363, size * 0.570);
    ctx.lineTo(size * 0.363, size * 0.430);
    ctx.lineTo(size * 0.5, size * 0.430);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    const innerGradient = ctx.createLinearGradient(0, 0, size, size);
    innerGradient.addColorStop(0, '#D97706');
    innerGradient.addColorStop(1, '#EA580C');
    ctx.fillStyle = innerGradient;
    ctx.beginPath();
    ctx.arc(size * 0.5, size * 0.410, size * 0.035, 0, Math.PI * 2);
    ctx.fill();
    
    return canvas;
};

const canvas192 = createIcon(192);
const canvas512 = createIcon(512);

fs.writeFileSync('public/icon-192.png', canvas192.toBuffer('image/png'));
fs.writeFileSync('public/icon-512.png', canvas512.toBuffer('image/png'));

console.log('Icons generated successfully!');

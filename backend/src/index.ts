import express from 'express';
import convert from 'color-convert';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

type Color = {
  name: string;
  rgb: [number, number, number];
}

const colors: Color[] = [
  { name: 'Red', rgb: [255, 0, 0] },
  { name: 'Orange', rgb: [255, 165, 0] },
  { name: 'Yellow', rgb: [255, 255, 0] },
  { name: 'Green', rgb: [0, 128, 0] },
  { name: 'Blue', rgb: [0, 0, 255] },
  { name: 'Indigo', rgb: [75, 0, 130] },
  { name: 'Violet', rgb: [238, 130, 238] },
  { name: 'White', rgb: [255, 255, 255] },
  { name: 'Black', rgb: [0, 0, 0] },
  { name: 'Gray', rgb: [128, 128, 128] },
  { name: 'Brown', rgb: [150, 75, 0] }
];

// Convert all colors to LAB
const colorsLab = colors.map(c => ({
  name: c.name,
  lab: convert.rgb.lab(c.rgb)
}));

function euclidean(a: number[], b: number[]) {
  return Math.sqrt(
    (a[0] - b[0]) ** 2 +
    (a[1] - b[1]) ** 2 +
    (a[2] - b[2]) ** 2
  );
}

app.post('/api/color', (req, res) => {
  const { r, g, b } = req.body;

  if (
    typeof r !== 'number' ||
    typeof g !== 'number' ||
    typeof b !== 'number'
  ) {
    return res.status(400).json({
      error: 'Provide r, g, b numbers'
    });
  }

  const inputLab = convert.rgb.lab([r, g, b]);

  let closest = colorsLab[0];
  let minDist = Infinity;

  for (const color of colorsLab) {
    const d = euclidean(inputLab, color.lab);
    if (d < minDist) {
      minDist = d;
      closest = color;
    }
  }

  res.json({
    input: { r, g, b },
    closestColor: closest.name,
    distance: minDist
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
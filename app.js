const express = require('express');
const path = require('path');
const fs = require('fs/promises');

const app = express();
const port = 3000;

const dataPath = path.join(__dirname, 'data', 'quests.json');

app.use(express.static('public'));
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Bajar desde el servidor
app.get('/quests', async (req, res) => {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    res.json(JSON.parse(data || '[]'));
  } catch (err) {
    if (err.code === 'ENOENT') {
      return res.json([]); // Si el archivo aún no existe, devuelve array vacío
    }
    console.error("Error al leer datos:", err);
    res.status(500).json({ error: "Error al leer misiones" });
  }
});

// Subir al servidor
app.post('/quests', async (req, res) => {
  const misiones = req.body;
  try {
    await fs.writeFile(dataPath, JSON.stringify(misiones, null, 2));
    res.json({ mensaje: 'Misiones guardadas correctamente en el servidor' });
  } catch (err) {
    console.error("Error al subir los datos al servidor:", err);
    res.status(500).json({ error: "Error al guardar misiones" });
  }
});

app.put('/quests/:id',async(req,res)=>{
    const data = await fs.readFile(dataPath,'utf-8')
    const misiones = JSON.parse(data)

    const indice = misiones.findIndex(m=>m.id==req.params.id)

    misiones[indice] = req.body
    await fs.writeFile(dataPath,JSON.stringify(misiones,null,2))

    res.send("Mision actualizada")
})

app.delete('/quests/:id',async (req,res)=>{
    const data = fs.readFile(dataPath,'utf-8')
    const misiones = JSON.parse(data)

    const nuevasMisiones = misiones.filter(m=>m.id!=req.params.id) //son las misiones que se quedan
    await fs.writeFile(dataPath,JSON.stringify(nuevasMisiones,null,2))

    res.send("Mision borrada")    

})
app.listen(port, () => {
  console.log(`Servidor RPG corriendo en http://localhost:${port}`);  
});
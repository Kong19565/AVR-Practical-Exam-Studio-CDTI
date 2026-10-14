// Three.js Procedural Models for all 8 Components
function create3DComponent(type) {
  const group = new THREE.Group();
  const pins = {}; // Map of pinId -> 3D Object / Vector3

  const metalMat = new THREE.MeshStandardMaterial({ color: 0xc0c0c8, metalness: 0.85, roughness: 0.25 });
  const goldMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8, roughness: 0.3 });
  const darkPlasticMat = new THREE.MeshStandardMaterial({ color: 0x1e2024, roughness: 0.7, metalness: 0.1 });

  if (type === 'arduino') {
    // 1. Arduino Uno R3 PCB
    const pcbGeo = new THREE.BoxGeometry(68, 2, 53);
    const pcbMat = new THREE.MeshStandardMaterial({ color: 0x008184, roughness: 0.4, metalness: 0.1 });
    const pcb = new THREE.Mesh(pcbGeo, pcbMat);
    group.add(pcb);

    // USB Type-B Port
    const usbGeo = new THREE.BoxGeometry(16, 11, 12);
    const usb = new THREE.Mesh(usbGeo, metalMat);
    usb.position.set(-27, 6.5, -13);
    group.add(usb);

    // DC Barrel Jack
    const dcGeo = new THREE.BoxGeometry(13, 10, 9);
    const dc = new THREE.Mesh(dcGeo, darkPlasticMat);
    dc.position.set(-28, 6, 17);
    group.add(dc);

    // ATmega328P DIP IC
    const icGeo = new THREE.BoxGeometry(35, 4, 8);
    const ic = new THREE.Mesh(icGeo, darkPlasticMat);
    ic.position.set(10, 3, 5);
    group.add(ic);

    // Crystal Oscillator
    const xtalGeo = new THREE.BoxGeometry(10, 3, 4);
    const xtal = new THREE.Mesh(xtalGeo, metalMat);
    xtal.position.set(-9, 2.5, -4);
    group.add(xtal);

    // Pin Headers (Female black strips)
    const topHdrGeo = new THREE.BoxGeometry(45, 8.5, 2.5);
    const topHdr = new THREE.Mesh(topHdrGeo, darkPlasticMat);
    topHdr.position.set(6, 5.25, -25);
    group.add(topHdr);

    const botHdrGeo = new THREE.BoxGeometry(48, 8.5, 2.5);
    const botHdr = new THREE.Mesh(botHdrGeo, darkPlasticMat);
    botHdr.position.set(6, 5.25, 25);
    group.add(botHdr);

    // Pin coordinate anchors for Arduino Uno
    // Top headers: D0 to D13, GND, AREF
    const dPins = ['d0', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10', 'd11', 'd12', 'd13'];
    dPins.forEach((p, idx) => {
      const pinObj = new THREE.Object3D();
      pinObj.position.set(24 - idx * 2.5, 9.5, -25);
      group.add(pinObj);
      pins[p] = pinObj;
    });

    // Bottom headers: Power & Analog
    const botPins = [
      { id: '5v', x: -8 },
      { id: 'gnd1', x: -5.5 },
      { id: 'a0', x: 7 },
      { id: 'a1', x: 9.5 },
      { id: 'a4', x: 17 },
      { id: 'a5', x: 19.5 }
    ];
    botPins.forEach(bp => {
      const pinObj = new THREE.Object3D();
      pinObj.position.set(bp.x, 9.5, 25);
      group.add(pinObj);
      pins[bp.id] = pinObj;
    });
  }

  else if (type === 'led') {
    // 2. 5mm LED Bulb
    const ledColor = 0xff2222;
    const bulbMat = new THREE.MeshPhysicalMaterial({
      color: ledColor,
      roughness: 0.1,
      metalness: 0.05,
      transmission: 0.85,
      transparent: true,
      opacity: 0.9,
      emissive: ledColor,
      emissiveIntensity: 0.35
    });

    // Cylinder body
    const bodyGeo = new THREE.CylinderGeometry(5, 5, 8, 24);
    const body = new THREE.Mesh(bodyGeo, bulbMat);
    body.position.y = 12;
    group.add(body);

    // Dome cap
    const domeGeo = new THREE.SphereGeometry(5, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const dome = new THREE.Mesh(domeGeo, bulbMat);
    dome.position.y = 16;
    group.add(dome);

    // Rim base
    const rimGeo = new THREE.CylinderGeometry(5.6, 5.6, 1.2, 24);
    const rim = new THREE.Mesh(rimGeo, bulbMat);
    rim.position.y = 8;
    group.add(rim);

    // Anode wire (Longer leg +)
    const anodeGeo = new THREE.CylinderGeometry(0.5, 0.5, 22, 12);
    const anode = new THREE.Mesh(anodeGeo, metalMat);
    anode.position.set(-2, -3, 0);
    group.add(anode);
    pins['anode'] = anode;

    // Cathode wire (Shorter leg -)
    const cathodeGeo = new THREE.CylinderGeometry(0.5, 0.5, 16, 12);
    const cathode = new THREE.Mesh(cathodeGeo, metalMat);
    cathode.position.set(2, 0, 0);
    group.add(cathode);
    pins['cathode'] = cathode;
  }

  else if (type === 'seg7') {
    // 3. 7-Segment Display (1 Digit CC)
    const boxGeo = new THREE.BoxGeometry(25, 38, 14);
    const boxMat = new THREE.MeshStandardMaterial({ color: 0x141416, roughness: 0.8 });
    const box = new THREE.Mesh(boxGeo, boxMat);
    group.add(box);

    const segOnMat = new THREE.MeshStandardMaterial({
      color: 0xff3333,
      emissive: 0xff1111,
      emissiveIntensity: 0.8,
      roughness: 0.2
    });

    // 7 Segments (a, b, c, d, e, f, g) + dp
    const hSegGeo = new THREE.BoxGeometry(10, 2, 1);
    const vSegGeo = new THREE.BoxGeometry(2, 9, 1);

    const segA = new THREE.Mesh(hSegGeo, segOnMat); segA.position.set(0, 12, 7.5); group.add(segA);
    const segB = new THREE.Mesh(vSegGeo, segOnMat); segB.position.set(5.5, 6, 7.5); group.add(segB);
    const segC = new THREE.Mesh(vSegGeo, segOnMat); segC.position.set(5.5, -6, 7.5); group.add(segC);
    const segD = new THREE.Mesh(hSegGeo, segOnMat); segD.position.set(0, -12, 7.5); group.add(segD);
    const segE = new THREE.Mesh(vSegGeo, segOnMat); segE.position.set(-5.5, -6, 7.5); group.add(segE);
    const segF = new THREE.Mesh(vSegGeo, segOnMat); segF.position.set(-5.5, 6, 7.5); group.add(segF);
    const segG = new THREE.Mesh(hSegGeo, segOnMat); segG.position.set(0, 0, 7.5); group.add(segG);

    const dpGeo = new THREE.SphereGeometry(1.2, 12, 12);
    const dp = new THREE.Mesh(dpGeo, segOnMat); dp.position.set(8.5, -12, 7.5); group.add(dp);

    // 10 Pins: 5 top, 5 bottom
    const segPinIds = ['g', 'f', 'com1', 'a', 'b', 'e', 'd', 'com2', 'c', 'dp'];
    for (let i = 0; i < 5; i++) {
      // Top pins
      const pinT = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 8, 8), metalMat);
      pinT.position.set(-8 + i * 4, 19, -4);
      group.add(pinT);
      pins[segPinIds[i]] = pinT;

      // Bottom pins
      const pinB = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 8, 8), metalMat);
      pinB.position.set(-8 + i * 4, -19, -4);
      group.add(pinB);
      pins[segPinIds[i + 5]] = pinB;
    }
  }

  else if (type === 'lcd') {
    // 4. LCD 16x2 Parallel
    const pcbGeo = new THREE.BoxGeometry(80, 36, 2);
    const pcbMat = new THREE.MeshStandardMaterial({ color: 0x135728, roughness: 0.4 });
    const pcb = new THREE.Mesh(pcbGeo, pcbMat);
    group.add(pcb);

    // Metal Frame / Bezel
    const bezelGeo = new THREE.BoxGeometry(71, 24, 3);
    const bezelMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5, metalness: 0.4 });
    const bezel = new THREE.Mesh(bezelGeo, bezelMat);
    bezel.position.set(0, -2, 2.5);
    group.add(bezel);

    // LCD Glass Screen
    const screenGeo = new THREE.BoxGeometry(64, 16, 0.5);
    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x1a4032,
      emissive: 0x0d281e,
      emissiveIntensity: 0.4,
      roughness: 0.1,
      metalness: 0.2
    });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.set(0, -2, 4.2);
    group.add(screen);

    // 16 Pin Header at Top
    const hdrStrip = new THREE.Mesh(new THREE.BoxGeometry(42, 3, 2.5), darkPlasticMat);
    hdrStrip.position.set(-14, 14.5, 2.5);
    group.add(hdrStrip);

    const pinLabels = ['1', '2', '3', '4', '5', '6', '7_10', '7_10', '7_10', '7_10', '11', '12', '13', '14', '15', '16'];
    for (let i = 0; i < 16; i++) {
      const pinMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 6, 8), metalMat);
      pinMesh.position.set(-32 + i * 2.5, 14.5, 5);
      pinMesh.rotation.x = Math.PI / 2;
      group.add(pinMesh);
      pins[pinLabels[i]] = pinMesh;
    }
  }

  else if (type === 'pot') {
    // 5. Potentiometer
    const bodyGeo = new THREE.CylinderGeometry(8, 8, 8, 24);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1b4d89, roughness: 0.5, metalness: 0.3 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.rotation.x = Math.PI / 2;
    group.add(body);

    // Shaft
    const shaftGeo = new THREE.CylinderGeometry(3, 3, 14, 24);
    const shaft = new THREE.Mesh(shaftGeo, metalMat);
    shaft.position.z = 10;
    shaft.rotation.x = Math.PI / 2;
    group.add(shaft);

    // 3 Solder Pins
    const pinIds = ['1', '2', '3'];
    pinIds.forEach((pid, i) => {
      const pinM = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 12, 10), metalMat);
      pinM.position.set(-4 + i * 4, -10, 0);
      group.add(pinM);
      pins[pid] = pinM;
    });
  }

  else if (type === 'btn') {
    // 6. Tactile Push Button (4 Pins)
    const baseGeo = new THREE.BoxGeometry(10, 5, 10);
    const base = new THREE.Mesh(baseGeo, darkPlasticMat);
    group.add(base);

    const actGeo = new THREE.CylinderGeometry(3, 3, 4, 24);
    const actMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.5 });
    const act = new THREE.Mesh(actGeo, actMat);
    act.position.y = 4;
    group.add(act);

    // 4 curved legs
    const p12 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 6, 1), metalMat);
    p12.position.set(-5.5, -3, -3); group.add(p12);
    pins['1_2'] = p12;

    const p34 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 6, 1), metalMat);
    p34.position.set(5.5, -3, 3); group.add(p34);
    pins['3_4'] = p34;
  }

  else if (type === 'res') {
    // 7. Resistor
    const bodyGeo = new THREE.CylinderGeometry(3, 3, 14, 20);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xd9c59a, roughness: 0.6 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.rotation.z = Math.PI / 2;
    group.add(body);

    // Color Bands (470 Ohm: Yellow, Violet, Brown, Gold)
    const bYellow = new THREE.Mesh(new THREE.CylinderGeometry(3.1, 3.1, 1.2, 20), new THREE.MeshStandardMaterial({ color: 0xfacc15 }));
    bYellow.position.x = -4; bYellow.rotation.z = Math.PI / 2; group.add(bYellow);

    const bViolet = new THREE.Mesh(new THREE.CylinderGeometry(3.1, 3.1, 1.2, 20), new THREE.MeshStandardMaterial({ color: 0x8b5cf6 }));
    bViolet.position.x = -1.5; bViolet.rotation.z = Math.PI / 2; group.add(bViolet);

    const bBrown = new THREE.Mesh(new THREE.CylinderGeometry(3.1, 3.1, 1.2, 20), new THREE.MeshStandardMaterial({ color: 0x78350f }));
    bBrown.position.x = 1; bBrown.rotation.z = Math.PI / 2; group.add(bBrown);

    const bGold = new THREE.Mesh(new THREE.CylinderGeometry(3.1, 3.1, 1.2, 20), goldMat);
    bGold.position.x = 4; bGold.rotation.z = Math.PI / 2; group.add(bGold);

    // Leads
    const lead1 = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 14, 12), metalMat);
    lead1.position.x = -14; lead1.rotation.z = Math.PI / 2; group.add(lead1);
    pins['leg1'] = lead1;

    const lead2 = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 14, 12), metalMat);
    lead2.position.x = 14; lead2.rotation.z = Math.PI / 2; group.add(lead2);
    pins['leg2'] = lead2;
  }

  else if (type === 'proto') {
    // 8. Breadboard
    const bbGeo = new THREE.BoxGeometry(84, 8, 54);
    const bbMat = new THREE.MeshStandardMaterial({ color: 0xf0f2f5, roughness: 0.8 });
    const bb = new THREE.Mesh(bbGeo, bbMat);
    group.add(bb);

    // Center divider
    const divGeo = new THREE.BoxGeometry(84, 1, 3);
    const div = new THREE.Mesh(divGeo, darkPlasticMat);
    div.position.y = 4.1;
    group.add(div);
    pins['center_trough'] = div;

    // Power Rails (Red and Blue stripes)
    const redMat = new THREE.MeshStandardMaterial({ color: 0xef4444 });
    const blueMat = new THREE.MeshStandardMaterial({ color: 0x2563eb });

    const rRail = new THREE.Mesh(new THREE.BoxGeometry(80, 0.5, 1.5), redMat);
    rRail.position.set(0, 4.1, -23); group.add(rRail);
    pins['red_rail'] = rRail;

    const bRail = new THREE.Mesh(new THREE.BoxGeometry(80, 0.5, 1.5), blueMat);
    bRail.position.set(0, 4.1, 23); group.add(bRail);
    pins['blue_rail'] = bRail;
  }

  return { group, pins };
}



// Function to create realistic curved 3D jumper wires
function createWireCurve(p1, p2, colorHex, arcHeight = 12) {
  const mid = new THREE.Vector3(
    (p1.x + p2.x) / 2,
    Math.max(p1.y, p2.y) + arcHeight,
    (p1.z + p2.z) / 2
  );
  const curve = new THREE.CatmullRomCurve3([p1, mid, p2]);
  const tubeGeo = new THREE.TubeGeometry(curve, 20, 0.65, 8, false);
  const tubeMat = new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.35, metalness: 0.1 });
  return new THREE.Mesh(tubeGeo, tubeMat);
}

// Build Complete 3D Circuit for a specific Lab
function create3DFullCircuit(labId) {
  const group = new THREE.Group();
  const pins = {};

  const metalMat = new THREE.MeshStandardMaterial({ color: 0xc0c0c8, metalness: 0.85, roughness: 0.25 });
  const darkPlasticMat = new THREE.MeshStandardMaterial({ color: 0x1e2024, roughness: 0.7, metalness: 0.1 });

  // 1. Breadboard at Center (X: 15, Y: 0, Z: 0)
  const protoObj = create3DComponent('proto');
  protoObj.group.position.set(15, 0, 0);
  group.add(protoObj.group);

  // 2. Arduino Uno on the Left (X: -55, Y: 0, Z: 5)
  const unoObj = create3DComponent('arduino');
  unoObj.group.position.set(-55, 0, 5);
  group.add(unoObj.group);

  // Power Rails Wires: Arduino 5V -> Breadboard Red Rail, Arduino GND -> Breadboard Blue Rail
  const ard5V = new THREE.Vector3(-63, 10, 30);
  const ardGND = new THREE.Vector3(-60.5, 10, 30);
  const bb5V = new THREE.Vector3(15, 4.5, -23);
  const bbGND = new THREE.Vector3(15, 4.5, 23);

  group.add(createWireCurve(ard5V, bb5V, 0xef4444, 18)); // Red wire 5V
  group.add(createWireCurve(ardGND, bbGND, 0x1e293b, 16)); // Black wire GND

  // Determine circuit type based on labId
  // 1. Level 3: LCD 16x2 Circuits (lab3_1, lab3_2, lab3_3, lab3_4)
  if (labId.startsWith('lab3_')) {
    // LCD 16x2 on upper breadboard
    const lcdObj = create3DComponent('lcd');
    lcdObj.group.position.set(15, 22, -10);
    lcdObj.group.rotation.x = -Math.PI / 12;
    group.add(lcdObj.group);

    // Potentiometer on lower breadboard for V0 Contrast!
    const potObj = create3DComponent('pot');
    potObj.group.position.set(-5, 6, 12);
    potObj.group.scale.set(0.75, 0.75, 0.75);
    group.add(potObj.group);

    const potPin1 = new THREE.Vector3(-8, 4, 12);   // 5V
    const potWiper = new THREE.Vector3(-5, 4, 12);  // Wiper -> V0
    const potPin3 = new THREE.Vector3(-2, 4, 12);   // GND

    const lcdVSS = new THREE.Vector3(-17, 34, -5);
    const lcdVDD = new THREE.Vector3(-14.5, 34, -5);
    const lcdV0  = new THREE.Vector3(-12, 34, -5);
    const lcdRS  = new THREE.Vector3(-9.5, 34, -5);
    const lcdRW  = new THREE.Vector3(-7, 34, -5);
    const lcdE   = new THREE.Vector3(-4.5, 34, -5);
    const lcdD4  = new THREE.Vector3(8, 34, -5);
    const lcdD5  = new THREE.Vector3(10.5, 34, -5);
    const lcdD6  = new THREE.Vector3(13, 34, -5);
    const lcdD7  = new THREE.Vector3(15.5, 34, -5);
    const lcdA   = new THREE.Vector3(18, 34, -5);
    const lcdK   = new THREE.Vector3(20.5, 34, -5);

    group.add(createWireCurve(potWiper, lcdV0, 0x06b6d4, 16));
    group.add(createWireCurve(potPin1, new THREE.Vector3(-8, 4.5, -23), 0xef4444, 12));
    group.add(createWireCurve(potPin3, new THREE.Vector3(-2, 4.5, 23), 0x1e293b, 10));

    group.add(createWireCurve(lcdVSS, bbGND, 0x1e293b, 14));
    group.add(createWireCurve(lcdVDD, bb5V, 0xef4444, 15));
    group.add(createWireCurve(lcdRW, bbGND, 0x1e293b, 12));

    const ardD12 = new THREE.Vector3(-55 + 24 - 12 * 2.5, 9.5, -20);
    const ardD11 = new THREE.Vector3(-55 + 24 - 11 * 2.5, 9.5, -20);
    group.add(createWireCurve(lcdRS, ardD12, 0xeab308, 18));
    group.add(createWireCurve(lcdE, ardD11, 0xf97316, 17));

    const ardD5 = new THREE.Vector3(-55 + 24 - 5 * 2.5, 9.5, -20);
    const ardD4 = new THREE.Vector3(-55 + 24 - 4 * 2.5, 9.5, -20);
    const ardD3 = new THREE.Vector3(-55 + 24 - 3 * 2.5, 9.5, -20);
    const ardD2 = new THREE.Vector3(-55 + 24 - 2 * 2.5, 9.5, -20);
    group.add(createWireCurve(lcdD4, ardD5, 0x10b981, 16));
    group.add(createWireCurve(lcdD5, ardD4, 0x10b981, 15));
    group.add(createWireCurve(lcdD6, ardD3, 0x10b981, 14));
    group.add(createWireCurve(lcdD7, ardD2, 0x10b981, 13));

    group.add(createWireCurve(lcdA, bb5V, 0xef4444, 12));
    group.add(createWireCurve(lcdK, bbGND, 0x1e293b, 10));

    // Lab 3.2: Voltmeter - add 2nd Potentiometer for Analog Input A0
    if (labId === 'lab3_2' || labId === 'lab3_4') {
      const pot2 = create3DComponent('pot');
      pot2.group.position.set(38, 6, 12);
      pot2.group.scale.set(0.75, 0.75, 0.75);
      group.add(pot2.group);
      const ardA0 = new THREE.Vector3(-55 + 7, 9.5, 30);
      group.add(createWireCurve(new THREE.Vector3(38, 4, 12), ardA0, 0x06b6d4, 18));
      group.add(createWireCurve(new THREE.Vector3(35, 4, 12), bb5V, 0xef4444, 14));
      group.add(createWireCurve(new THREE.Vector3(41, 4, 12), bbGND, 0x1e293b, 12));
    }

    // Lab 3.3: Counter - add buttons
    if (labId === 'lab3_3') {
      const btn1 = create3DComponent('btn'); btn1.group.position.set(32, 4, 12); group.add(btn1.group);
      const btn2 = create3DComponent('btn'); btn2.group.position.set(46, 4, 12); group.add(btn2.group);
      const ardD8 = new THREE.Vector3(-55 + 24 - 8 * 2.5, 9.5, -20);
      const ardD9 = new THREE.Vector3(-55 + 24 - 9 * 2.5, 9.5, -20);
      group.add(createWireCurve(new THREE.Vector3(32, 4, 12), ardD8, 0xa855f7, 20));
      group.add(createWireCurve(new THREE.Vector3(46, 4, 12), ardD9, 0xec4899, 22));
    }
  }

  // 2. 7-Segment Circuits (lab1_4, lab1_5, lab2_4, lab2_5)
  else if (labId === 'lab1_4' || labId === 'lab1_5' || labId === 'lab2_4' || labId === 'lab2_5') {
    const segM = create3DComponent('seg7');
    segM.group.position.set(15, 8, 0);
    segM.group.scale.set(0.85, 0.85, 0.85);
    group.add(segM.group);

    for (let i = 0; i < 7; i++) {
      const ardD = new THREE.Vector3(-55 + 24 - (2 + i) * 2.5, 9.5, -20);
      const segTarget = new THREE.Vector3(9 + i * 2, 10, -5);
      group.add(createWireCurve(ardD, segTarget, 0xf59e0b, 13 + i));
    }
    group.add(createWireCurve(new THREE.Vector3(15, 5, 8), bbGND, 0x1e293b, 10));

    if (labId === 'lab1_5') {
      const btnM = create3DComponent('btn');
      btnM.group.position.set(38, 4, 12);
      group.add(btnM.group);
      const ardD9 = new THREE.Vector3(-55 + 24 - 9 * 2.5, 9.5, -20);
      group.add(createWireCurve(new THREE.Vector3(38, 4, 12), ardD9, 0xa855f7, 18));
      group.add(createWireCurve(new THREE.Vector3(38, 4, 14), bbGND, 0x1e293b, 8));
    } else if (labId === 'lab2_4') {
      const btnUp = create3DComponent('btn'); btnUp.group.position.set(36, 4, 10); group.add(btnUp.group);
      const btnDn = create3DComponent('btn'); btnDn.group.position.set(48, 4, 10); group.add(btnDn.group);
      const ardD9 = new THREE.Vector3(-55 + 24 - 9 * 2.5, 9.5, -20);
      const ardD10 = new THREE.Vector3(-55 + 24 - 10 * 2.5, 9.5, -20);
      group.add(createWireCurve(new THREE.Vector3(36, 4, 10), ardD9, 0xa855f7, 18));
      group.add(createWireCurve(new THREE.Vector3(48, 4, 10), ardD10, 0xec4899, 20));
      group.add(createWireCurve(new THREE.Vector3(36, 4, 14), bbGND, 0x1e293b, 8));
      group.add(createWireCurve(new THREE.Vector3(48, 4, 14), bbGND, 0x1e293b, 8));
    } else if (labId === 'lab2_5') {
      const potM = create3DComponent('pot');
      potM.group.position.set(38, 6, 10);
      potM.group.scale.set(0.75, 0.75, 0.75);
      group.add(potM.group);
      const ardA0 = new THREE.Vector3(-55 + 7, 9.5, 30);
      group.add(createWireCurve(new THREE.Vector3(38, 4, 10), ardA0, 0x06b6d4, 18));
      group.add(createWireCurve(new THREE.Vector3(35, 4, 10), bb5V, 0xef4444, 12));
      group.add(createWireCurve(new THREE.Vector3(41, 4, 10), bbGND, 0x1e293b, 10));
    }
  }

  // 3. 6 LEDs Circuits (lab1_1, lab2_3)
  else if (labId === 'lab1_1' || labId === 'lab2_3') {
    for (let i = 0; i < 6; i++) {
      const ledM = create3DComponent('led');
      ledM.group.position.set(-5 + i * 8, 4, 5);
      ledM.group.scale.set(0.65, 0.65, 0.65);
      group.add(ledM.group);

      const ardD = new THREE.Vector3(-55 + 24 - (2 + i) * 2.5, 9.5, -20);
      const ledAnode = new THREE.Vector3(-6 + i * 8, 5, 5);
      group.add(createWireCurve(ardD, ledAnode, 0x10b981, 14 + i));

      const rMesh = create3DComponent('res');
      rMesh.group.position.set(-4 + i * 8, 4, 14);
      rMesh.group.scale.set(0.5, 0.5, 0.5);
      group.add(rMesh.group);
      group.add(createWireCurve(new THREE.Vector3(-4 + i * 8, 4, 17), bbGND, 0x1e293b, 8));
    }

    if (labId === 'lab2_3') {
      const potM = create3DComponent('pot');
      potM.group.position.set(45, 6, 8);
      potM.group.scale.set(0.7, 0.7, 0.7);
      group.add(potM.group);
      const ardA0 = new THREE.Vector3(-55 + 7, 9.5, 30);
      group.add(createWireCurve(new THREE.Vector3(45, 4, 8), ardA0, 0x06b6d4, 18));
      group.add(createWireCurve(new THREE.Vector3(42, 4, 8), bb5V, 0xef4444, 12));
      group.add(createWireCurve(new THREE.Vector3(48, 4, 8), bbGND, 0x1e293b, 10));
    }
  }

  // 4. 1 Button + 1 LED (lab1_2)
  else if (labId === 'lab1_2') {
    const btnM = create3DComponent('btn');
    btnM.group.position.set(5, 4, 8);
    group.add(btnM.group);

    const ardD2 = new THREE.Vector3(-55 + 24 - 2 * 2.5, 9.5, -20);
    group.add(createWireCurve(new THREE.Vector3(5, 4, 8), ardD2, 0xa855f7, 18));
    group.add(createWireCurve(new THREE.Vector3(5, 4, 12), bbGND, 0x1e293b, 8));

    const ledM = create3DComponent('led');
    ledM.group.position.set(28, 4, 5);
    ledM.group.scale.set(0.75, 0.75, 0.75);
    group.add(ledM.group);

    const ardD8 = new THREE.Vector3(-55 + 24 - 8 * 2.5, 9.5, -20);
    group.add(createWireCurve(ardD8, new THREE.Vector3(27, 5, 5), 0x10b981, 16));

    const rMesh = create3DComponent('res');
    rMesh.group.position.set(29, 4, 14);
    rMesh.group.scale.set(0.5, 0.5, 0.5);
    group.add(rMesh.group);
    group.add(createWireCurve(new THREE.Vector3(29, 4, 17), bbGND, 0x1e293b, 8));
  }

  // 5. 2 Buttons + 2 LEDs (lab1_3)
  else if (labId === 'lab1_3') {
    const btn1 = create3DComponent('btn'); btn1.group.position.set(-2, 4, 8); group.add(btn1.group);
    const btn2 = create3DComponent('btn'); btn2.group.position.set(12, 4, 8); group.add(btn2.group);

    const ardD2 = new THREE.Vector3(-55 + 24 - 2 * 2.5, 9.5, -20);
    const ardD3 = new THREE.Vector3(-55 + 24 - 3 * 2.5, 9.5, -20);
    group.add(createWireCurve(new THREE.Vector3(-2, 4, 8), ardD2, 0xa855f7, 16));
    group.add(createWireCurve(new THREE.Vector3(12, 4, 8), ardD3, 0xec4899, 18));
    group.add(createWireCurve(new THREE.Vector3(-2, 4, 12), bbGND, 0x1e293b, 8));
    group.add(createWireCurve(new THREE.Vector3(12, 4, 12), bbGND, 0x1e293b, 8));

    const led1 = create3DComponent('led'); led1.group.position.set(28, 4, 5); led1.group.scale.set(0.7, 0.7, 0.7); group.add(led1.group);
    const led2 = create3DComponent('led'); led2.group.position.set(38, 4, 5); led2.group.scale.set(0.7, 0.7, 0.7); group.add(led2.group);

    const ardD8 = new THREE.Vector3(-55 + 24 - 8 * 2.5, 9.5, -20);
    const ardD9 = new THREE.Vector3(-55 + 24 - 9 * 2.5, 9.5, -20);
    group.add(createWireCurve(ardD8, new THREE.Vector3(27, 5, 5), 0x10b981, 16));
    group.add(createWireCurve(ardD9, new THREE.Vector3(37, 5, 5), 0x10b981, 18));
  }

  // 6. Potentiometer & ADC circuits (lab2_1, lab2_2, lab2_6)
  else if (labId === 'lab2_1' || labId === 'lab2_2' || labId === 'lab2_6') {
    const potM = create3DComponent('pot');
    potM.group.position.set(8, 6, 8);
    potM.group.scale.set(0.85, 0.85, 0.85);
    group.add(potM.group);

    const ardA0 = new THREE.Vector3(-55 + 7, 9.5, 30);
    group.add(createWireCurve(new THREE.Vector3(8, 4, 8), ardA0, 0x06b6d4, 18));
    group.add(createWireCurve(new THREE.Vector3(5, 4, 8), bb5V, 0xef4444, 12));
    group.add(createWireCurve(new THREE.Vector3(11, 4, 8), bbGND, 0x1e293b, 10));

    // LED on D9 (PWM) or D13
    const ledM = create3DComponent('led');
    ledM.group.position.set(30, 4, 5);
    ledM.group.scale.set(0.75, 0.75, 0.75);
    group.add(ledM.group);

    const ardD9 = new THREE.Vector3(-55 + 24 - 9 * 2.5, 9.5, -20);
    group.add(createWireCurve(ardD9, new THREE.Vector3(29, 5, 5), 0x10b981, 16));

    const rMesh = create3DComponent('res');
    rMesh.group.position.set(30, 4, 14);
    rMesh.group.scale.set(0.5, 0.5, 0.5);
    group.add(rMesh.group);
    group.add(createWireCurve(new THREE.Vector3(30, 4, 17), bbGND, 0x1e293b, 8));
  }

  else {
    // Clean LED fallback (NO Potentiometer!)
    const ledM = create3DComponent('led');
    ledM.group.position.set(15, 4, 5);
    ledM.group.scale.set(0.75, 0.75, 0.75);
    group.add(ledM.group);
  }

  return { group, pins };
}

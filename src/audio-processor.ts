class AtanProcessor extends AudioWorkletProcessor {
  process(inputs: Float32Array[][], outputs: Float32Array[][]) {
    const atan = 10;
    for (let i = inputs.length; i--; )
      for (let j = inputs[i].length; j--; )
        for (let k = inputs[i][j].length; k--; )
          // apply atan curve to audio
          outputs[i][j][k] =
            Math.atan(atan * inputs[i][j][k]) / Math.atan(atan);
    return true;
  }
}

registerProcessor("atan-processor", AtanProcessor);

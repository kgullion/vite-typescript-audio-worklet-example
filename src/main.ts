import atanProcessorUrl from "./audio-processor.ts?url";
console.log(atanProcessorUrl)

async function createWorkletNode(
  context: BaseAudioContext,
  name: string,
  url: string
) {
  // ensure audioWorklet has been loaded
  try {
    return new AudioWorkletNode(context, name);
  } catch (err) {
    await context.audioWorklet.addModule(url);
    return new AudioWorkletNode(context, name);
  }
}

let context: AudioContext;
const fileInput = document.querySelector<HTMLInputElement>("#fileInput")!;
fileInput.addEventListener("change", async (e) => {
  const files = (e.target as HTMLInputElement).files as FileList;
  if (files.length > 0) {
    if (!context) context = new AudioContext();
    // convert uploaded file to AudioBuffer
    const buffer = await context.decodeAudioData(await files[0].arrayBuffer());
    // create source and set buffer
    const source = context.createBufferSource();
    source.buffer = buffer;
    // create atan node
    const atan = await createWorkletNode(context, "atan-processor", atanProcessorUrl)
    // connect everything and automatically start playing
    source.connect(atan).connect(context.destination);
    source.start(0);
  }
});

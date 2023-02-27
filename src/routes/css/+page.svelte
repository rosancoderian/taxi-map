<script>
  import { onMount } from 'svelte'

  let text = randomizeNumber()

  function randomizeNumber() {
    return Math.random().toString().slice(2, 11)
  }

  onMount(() => {
    setInterval(() => {
      text = randomizeNumber()
    }, 375)
  })
</script>

<div class="container">
  <div class="top">
    <video class="video" src="/video.mp4" loop autoplay muted />
    <div class="text-container">
      <div class="text">
        {text}
      </div>
    </div>
  </div>
  <button class="button">Click me!</button>
</div>

<head>
  <link href="https://fonts.googleapis.com/css?family=Courier Prime" rel="stylesheet" />
</head>

<style global>
  * {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
  }

  html,
  body {
    font-family: 'Courier Prime';
    color: white;
    background: black;
    height: 100%;
    width: 100%;
    margin: 0px !important;
  }

  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .top {
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  .button {
    padding: 24px;
    width: 100%;
    background: white;
    color: black;
    transition: all 0.2s;
  }

  .button:hover {
    background: red;
    color: white;
    transition: all 0.2s;
    cursor: pointer;
  }

  .video {
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .text-container {
    position: absolute;
    top: 0;
    left: 0;
    background-color: black;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 20;
    mix-blend-mode: multiply;
  }

  .text {
    color: white;
    font-size: 11rem;
    word-break: break-all;
    font-weight: 900;
  }

  @media (max-width: 1023px) {
    .text {
      font-size: 18vw;
      width: 3ch;
    }
  }
</style>

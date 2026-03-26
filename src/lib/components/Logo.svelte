<script>
  let {
    size = 24,
    strokeWidth = 1.6
  } = $props();
</script>

<svg xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 80 80"
    width="{size}"
    height="{size}"
    fill="none"
    stroke-width="{strokeWidth}"
    stroke="currentColor"
>
  <defs>
    <!-- Hides orbit stroke where it overlaps the planet (for the faded back arc) -->
    <mask id="backMask">
      <rect width="80" height="80" fill="white"/>
      <circle cx="37" cy="40" r="22" fill="black"/>
    </mask>
  </defs>

  <!-- 1. Planet — drawn first, sits behind front arc -->
  <circle cx="37" cy="40" r="22"
          fill="none"
          stroke="currentColor"
          stroke-width="{strokeWidth}"/>

  <!-- 2. Back arc — faded, masked so it hides behind planet -->
  <ellipse cx="40" cy="42" rx="37" ry="13"
           transform="rotate(-28 40 42)"
           fill="none"
           stroke="currentColor"
           stroke-width="{strokeWidth}"
           stroke-dasharray="4 3.5"
           stroke-linecap="round"
           opacity="0.22"
           mask="url(#backMask)"/>

  <!-- 3. Front arc — full opacity, no mask, drawn over the planet -->
  <ellipse cx="40" cy="42" rx="37" ry="13"
           transform="rotate(-28 40 42)"
           fill="none"
           stroke="currentColor"
           stroke-width="{strokeWidth}"
           stroke-dasharray="4 3.5"
           stroke-linecap="round"
           opacity="0.65"/>

  <!-- Satellite dot -->
  <circle cx="65" cy="30" r="2"
          fill="#1a1a18"
          opacity="0.8"/>

  <!-- Heart — lower-right offset -->
  <path d="M 46 54
           C 43 52, 38 48, 37 44
           C 36 41, 37 38, 40 38
           C 42 38, 44 40, 46 43
           C 48 40, 50 38, 52 38
           C 55 38, 56 41, 55 44
           C 54 48, 49 52, 46 54 Z"
        fill="none"
        stroke="currentColor"
        stroke-width="{strokeWidth}"
        stroke-linecap="round"
        stroke-linejoin="round"/>
</svg>

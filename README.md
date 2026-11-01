# Vanishing Wild

Open index.html with VS Code Live Server so the shared navigation and footer can load through fetch.

## Coursework

The site introduces endangered animals, their habitats, and conservation pressures. project.html contains an interactive animal field guide plus five project ideas and their audiences. poster.html is a 1200 × 630 poster sketch.

## Habitat interaction

The Habitats navigation link opens habitats.html. Choose Forest, Ocean, Freshwater, Island, or Grassland, then drag the Environment change slider to blend continuously between intact and degraded views. Arrow keys, Home and End work on the focused slider; Restore intact view resets it. Choosing another environment starts at the intact view.

Each images/habitats PNG contains two vertically stacked panels. habitats.css displays the upper and lower panels in matching layers; habitats.js changes the pressure layer opacity on every input event. The five scenes map to real environmental pressures: deforestation and stream pollution, ocean warming and marine pollution, drought and reduced river flow, coastal erosion, and overgrazing with soil erosion. Images load on demand, with a retry action and protection against stale loads during fast environment changes. Generated scenes are illustrative rather than measured environmental data; exact prompts are recorded in images/habitats/PROVENANCE.md.

## Poster and publication

The poster is today's first sketch. Export its .poster element as a 1200 × 630 JPG or PNG under 100 KB to images/og-image.jpg before the next session. Once the live address is known, add absolute HTTPS og:image and og:url meta tags to every public page. Do not invent a domain.

Create a GitHub repository, enable two-factor authentication, and push the local history. Commit future improvements as they happen; the first snapshot is not a reconstruction of past work.

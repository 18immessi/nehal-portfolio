/* ==========================================================================
   SKILLS GALLERY DATA
   This is the only file you should need to edit to change what shows up
   when a skill is clicked. The modal itself (in main.js) just reads from
   this list — it doesn't care what's in it.

   Each skill has exactly 6 images. If an image file doesn't exist yet at
   the path given, the gallery shows a tasteful placeholder instead of a
   broken-image icon — so it's safe to leave paths pointing at files you
   haven't uploaded yet.

   To add a new skill: copy one whole { ... } block below, give it a unique
   "id" (used internally, not shown), and add a matching button in the
   Skills section of index.html with the same data-skill="your-id".
   ========================================================================== */

const SKILLS_DATA = [
  {
    id: 'video-editing',
    title: 'Video Editing',
    description: 'Building the structure, pacing and rhythm of a video from the first cut to the final export.',
    images: [
      { src: 'assets/images/skills/video-editing-1.jpg', caption: 'Timeline — first assembly' },
      { src: 'assets/images/skills/video-editing-2.jpg', caption: 'Timeline — refining pacing' },
      { src: 'assets/images/skills/video-editing-3.jpg', caption: 'Timeline — final pass' },
      { src: 'assets/images/skills/video-editing-4.jpg', caption: 'Editing workflow' },
      { src: 'assets/images/skills/video-editing-5.jpg', caption: 'Final export frame' },
      { src: 'assets/images/skills/video-editing-6.jpg', caption: 'Project overview' },
    ],
  },
  {
    id: 'motion-graphics',
    title: 'Motion Graphics',
    description: 'Using motion, typography and visual effects to make information feel more dynamic and engaging.',
    images: [
      { src: 'assets/images/skills/motion-graphics-1.jpg', caption: 'Fusion composition' },
      { src: 'assets/images/skills/motion-graphics-2.jpg', caption: 'Node graph' },
      { src: 'assets/images/skills/motion-graphics-3.jpg', caption: 'Animation timeline' },
      { src: 'assets/images/skills/motion-graphics-4.jpg', caption: 'Finished motion graphic' },
      { src: 'assets/images/skills/motion-graphics-5.jpg', caption: 'Fusion setup' },
      { src: 'assets/images/skills/motion-graphics-6.jpg', caption: 'Final render' },
    ],
  },
  {
    id: 'davinci-resolve-fusion',
    title: 'DaVinci Resolve & Fusion',
    description: 'Editing, compositing, grading and mixing — all inside one native workflow.',
    images: [
      { src: 'assets/images/skills/davinci-resolve-fusion-1.jpg', caption: 'Edit page' },
      { src: 'assets/images/skills/davinci-resolve-fusion-2.jpg', caption: 'Fusion nodes' },
      { src: 'assets/images/skills/davinci-resolve-fusion-3.jpg', caption: 'Fusion composition' },
      { src: 'assets/images/skills/davinci-resolve-fusion-4.jpg', caption: 'Color page' },
      { src: 'assets/images/skills/davinci-resolve-fusion-5.jpg', caption: 'Fairlight audio page' },
      { src: 'assets/images/skills/davinci-resolve-fusion-6.jpg', caption: 'Full Resolve workflow' },
    ],
  },
  {
    id: 'short-form-content',
    title: 'Short-Form Content',
    description: 'Cutting for platforms where the first second decides whether someone keeps watching.',
    images: [
      { src: 'assets/images/skills/short-form-content-1.jpg', caption: 'Vertical timeline' },
      { src: 'assets/images/skills/short-form-content-2.jpg', caption: 'Hook — first three seconds' },
      { src: 'assets/images/skills/short-form-content-3.jpg', caption: 'Caption timing' },
      { src: 'assets/images/skills/short-form-content-4.jpg', caption: 'Pacing pass' },
      { src: 'assets/images/skills/short-form-content-5.jpg', caption: 'Final vertical export' },
      { src: 'assets/images/skills/short-form-content-6.jpg', caption: 'Project overview' },
    ],
  },
  {
    id: 'youtube-editing',
    title: 'YouTube Editing',
    description: 'Pacing long-form videos so viewers stay through the mid-roll and to the end.',
    images: [
      { src: 'assets/images/skills/youtube-editing-1.jpg', caption: 'Long-form timeline' },
      { src: 'assets/images/skills/youtube-editing-2.jpg', caption: 'Thumbnail-ready frame' },
      { src: 'assets/images/skills/youtube-editing-3.jpg', caption: 'B-roll and pacing' },
      { src: 'assets/images/skills/youtube-editing-4.jpg', caption: 'Sound and music layering' },
      { src: 'assets/images/skills/youtube-editing-5.jpg', caption: 'Final export' },
      { src: 'assets/images/skills/youtube-editing-6.jpg', caption: 'Project overview' },
    ],
  },
  {
    id: 'storytelling',
    title: 'Storytelling',
    description: 'Shaping raw footage into a story with a clear beginning, turn and payoff.',
    images: [
      { src: 'assets/images/skills/storytelling-1.jpg', caption: 'Story structure outline' },
      { src: 'assets/images/skills/storytelling-2.jpg', caption: 'Sequencing key beats' },
      { src: 'assets/images/skills/storytelling-3.jpg', caption: 'Pacing the narrative arc' },
      { src: 'assets/images/skills/storytelling-4.jpg', caption: 'Building tension through cuts' },
      { src: 'assets/images/skills/storytelling-5.jpg', caption: 'Final story cut' },
      { src: 'assets/images/skills/storytelling-6.jpg', caption: 'Project overview' },
    ],
  },
  {
    id: 'sound-design',
    title: 'Sound Design',
    description: 'Layering music, effects and dialogue so a video feels finished, not just edited.',
    images: [
      { src: 'assets/images/skills/sound-design-1.jpg', caption: 'Audio timeline' },
      { src: 'assets/images/skills/sound-design-2.jpg', caption: 'Fairlight mixing' },
      { src: 'assets/images/skills/sound-design-3.jpg', caption: 'SFX layering' },
      { src: 'assets/images/skills/sound-design-4.jpg', caption: 'Dialogue cleanup' },
      { src: 'assets/images/skills/sound-design-5.jpg', caption: 'Final mix' },
      { src: 'assets/images/skills/sound-design-6.jpg', caption: 'Project overview' },
    ],
  },
  {
    id: 'colour-grading',
    title: 'Colour Grading',
    description: 'Matching shots and setting a mood through colour, without losing a natural look.',
    images: [
      { src: 'assets/images/skills/colour-grading-1.jpg', caption: 'Before grading' },
      { src: 'assets/images/skills/colour-grading-2.jpg', caption: 'After grading' },
      { src: 'assets/images/skills/colour-grading-3.jpg', caption: 'Node setup' },
      { src: 'assets/images/skills/colour-grading-4.jpg', caption: 'Scopes and balancing' },
      { src: 'assets/images/skills/colour-grading-5.jpg', caption: 'Look development' },
      { src: 'assets/images/skills/colour-grading-6.jpg', caption: 'Final graded frame' },
    ],
  },
  {
    id: 'captions-subtitles',
    title: 'Captions & Subtitles',
    description: 'Styling and timing text so it supports the edit instead of distracting from it.',
    images: [
      { src: 'assets/images/skills/captions-subtitles-1.jpg', caption: 'Caption styling' },
      { src: 'assets/images/skills/captions-subtitles-2.jpg', caption: 'Subtitle timing' },
      { src: 'assets/images/skills/captions-subtitles-3.jpg', caption: 'Animated captions' },
      { src: 'assets/images/skills/captions-subtitles-4.jpg', caption: 'Multi-language pass' },
      { src: 'assets/images/skills/captions-subtitles-5.jpg', caption: 'Vertical caption placement' },
      { src: 'assets/images/skills/captions-subtitles-6.jpg', caption: 'Final captioned export' },
    ],
  },
  {
    id: 'retention-focused-editing',
    title: 'Retention-Focused Editing',
    description: "Watching where attention drops and re-cutting until it doesn't.",
    images: [
      { src: 'assets/images/skills/retention-focused-editing-1.jpg', caption: 'Retention graph review' },
      { src: 'assets/images/skills/retention-focused-editing-2.jpg', caption: 'Re-cutting a slow section' },
      { src: 'assets/images/skills/retention-focused-editing-3.jpg', caption: 'Pattern-interrupt placement' },
      { src: 'assets/images/skills/retention-focused-editing-4.jpg', caption: 'Hook refinement' },
      { src: 'assets/images/skills/retention-focused-editing-5.jpg', caption: 'Pacing pass' },
      { src: 'assets/images/skills/retention-focused-editing-6.jpg', caption: 'Final cut' },
    ],
  },
];

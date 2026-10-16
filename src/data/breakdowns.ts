export interface TechnicalBreakdown {
  slug: string;
  gameTitle: string;
  tagline: string;
  engine: string;
  genre: string;
  jamOrContext: string;
  accentColor: string;
  playUrl: string;
  itchUrl: string;
  coverImage: string;
  bannerImage: string;
  summary: string;
  challenge: {
    title: string;
    description: string;
    keyPoints: string[];
  };
  implementation: {
    title: string;
    description: string;
    architecturePoints: {
      headline: string;
      details: string;
    }[];
    codeSnippet: {
      fileName: string;
      language: string;
      code: string;
      explanation: string;
    };
  };
  results: {
    title: string;
    description: string;
    metrics: {
      label: string;
      value: string;
      detail: string;
    }[];
    takeaways: string[];
  };
}

export const technicalBreakdowns: Record<string, TechnicalBreakdown> = {
  "risky-business": {
    slug: "risky-business",
    gameTitle: "Risky Business",
    tagline: "Break. Earn. Upgrade. Gamble. Repeat.",
    engine: "Unity (C#) / WebGL",
    genre: "2D Incremental / Arcade",
    jamOrContext: "IIITN Game Jam — Tantrafiesta 2026 (Theme: Plot Twist)",
    accentColor: "from-amber-500 to-orange-600",
    playUrl: "/games/risky-business",
    itchUrl: "https://kdivyanshu.itch.io/risky-business",
    coverImage: "/images/games/risky-business-cover.png",
    bannerImage: "/images/games/risky-business-banner.png",
    summary:
      "A pirate-themed incremental game that turns conventional progression upside down by introducing high-stakes gambling mechanics where accumulated coins can be completely wiped out or multiplied to escape the island.",
    challenge: {
      title: "The Problem & Design Challenge",
      description:
        "Incremental games inherently train players to expect monotonic growth — numbers only go up, upgrades are permanent, and time invested is guaranteed to yield compounding returns. The challenge was to violate that core expectation without making the game feel cheap or unfair.",
      keyPoints: [
        "Progression Tension: Harmonizing two opposing psychological rhythms: the predictable, tactile satisfaction of breaking crates for coins vs. the high-volatility risk of gambling.",
        "State Integrity: In a rapid-input browser game, coin collection, upgrade purchases, and machine reels must never desynchronize or allow double-spend exploits.",
        "Long-term Escape Motive: Providing an overarching win condition (accumulating enough gold to charter the escape ship) so players consciously evaluate whether to bank or bet.",
      ],
    },
    implementation: {
      title: "Implementation & Architectural Decisions",
      description:
        "I decoupled the economy, game loop, and gambling machine through an event-driven transactional model in C#, backed by deterministic state machines.",
      architecturePoints: [
        {
          headline: "Atomic Transaction Economy Manager",
          details:
            "Implemented an EconomyManager that treats all resource mutations (crate drops, upgrades, gambling bets) as discrete transactions. Balance deductions are validated client-side and locked during slot reel spins, preventing concurrent request corruption.",
        },
        {
          headline: "Object-Pooled Dynamic Crates & Debris",
          details:
            "Designed a pooled spawner for crates and coin pick-ups. Crates utilize 2D rigidbodies with pre-warmed hit-point state machines, ensuring consistent 60 FPS in WebGL by eliminating garbage-collection overhead.",
        },
        {
          headline: "Probabilistic Multiplier & Risk Curves",
          details:
            "Structured tiered gambling algorithms with dynamic odds. Machines evaluate player bet tiers against configurable paytables, firing visual reel tweens and dispatching resolved payout events to the audio and currency subsystems.",
        },
      ],
      codeSnippet: {
        fileName: "EconomyManager.cs",
        language: "csharp",
        code: `using System;
using UnityEngine;

public class EconomyManager : MonoBehaviour
{
    public static EconomyManager Instance { get; private set; }

    public int CurrentCoins { get; private set; } = 0;
    public int EscapeGoal { get; private set; } = 5000;

    public event Action<int> OnBalanceChanged;
    public event Action<string> OnTransactionFailed;
    public event Action OnEscapeGoalReached;

    private bool isTransactionLocked = false;

    private void Awake()
    {
        if (Instance != null && Instance != this) { Destroy(gameObject); return; }
        Instance = this;
    }

    public void AddCoins(int amount, string source)
    {
        if (amount <= 0) return;
        CurrentCoins += amount;
        OnBalanceChanged?.Invoke(CurrentCoins);

        if (CurrentCoins >= EscapeGoal)
            OnEscapeGoalReached?.Invoke();
    }

    public bool TryExecuteGamble(int wager, float winMultiplier, float winProbability, out int payout)
    {
        payout = 0;
        if (isTransactionLocked)
        {
            OnTransactionFailed?.Invoke("Machine is currently spinning!");
            return false;
        }

        if (CurrentCoins < wager)
        {
            OnTransactionFailed?.Invoke("Insufficient coins to place bet!");
            return false;
        }

        // Deduct wager atomically
        CurrentCoins -= wager;
        OnBalanceChanged?.Invoke(CurrentCoins);
        isTransactionLocked = true;

        // Resolve risk-reward outcome
        bool won = UnityEngine.Random.value <= winProbability;
        if (won)
        {
            payout = Mathf.RoundToInt(wager * winMultiplier);
            CurrentCoins += payout;
        }

        isTransactionLocked = false;
        OnBalanceChanged?.Invoke(CurrentCoins);
        return won;
    }
}`,
        explanation:
          "This transactional pattern guarantees that rapid player inputs cannot cause race conditions or duplicate spending during gambling cycles in WebGL.",
      },
    },
    results: {
      title: "Results & Measurable Impact",
      description:
        "Risky Business was deployed as an optimized browser-playable build for IIITN Tantrafiesta 2026, delivering high-stakes gameplay with flawless stability.",
      metrics: [
        {
          label: "Framerate Stability",
          value: "60 FPS",
          detail: "Constant 60 FPS performance in WebGL via zero-allocation object pooling.",
        },
        {
          label: "Transaction Reliability",
          value: "100%",
          detail: "Zero balance desync or double-spend glitches across thousands of spin cycles.",
        },
        {
          label: "Browser Load Time",
          value: "< 3.2s",
          detail: "Compressed WebGL build with Brotli assets under 15MB total footprint.",
        },
      ],
      takeaways: [
        "Balancing high risk with accessible feedback loops creates memorable, emotionally charged game jam moments.",
        "Transactional safety patterns in Unity C# are critical even in single-player arcade games to avoid fragile state regressions.",
      ],
    },
  },

  "split-you": {
    slug: "split-you",
    gameTitle: "Split You",
    tagline: "One move. Two consequences.",
    engine: "Unity (C#) / WebGL",
    genre: "2D Puzzle Platformer",
    jamOrContext: "Independent Commercial Prototype — 16 Handcrafted Levels",
    accentColor: "from-emerald-500 to-teal-600",
    playUrl: "/games/split-you",
    itchUrl: "https://kdivyanshu.itch.io/split-you",
    coverImage: "/images/games/split-you-cover.png",
    bannerImage: "/images/games/split-you-banner.png",
    summary:
      "A dual-character puzzle platformer where movement inputs are shared between a green ninja and a pink ninja clone across 16 handcrafted levels, requiring simultaneous arrival at dual exit doors.",
    challenge: {
      title: "The Problem & Design Challenge",
      description:
        "When a single player input command broadcasts simultaneously to multiple physics-driven bodies, level geometry complexity multiplies exponentially. A jump that clears a spike pit for Character A can catapult Character B directly into a crushing hazard. The core challenge was making this dual-character relationship understandable, perfectly deterministic, and satisfying rather than arbitrary or punitive.",
      keyPoints: [
        "Input Determinism: Both characters must interpret identical input vectors synchronously without jitter, desynchronization, or frame latency.",
        "Clone Spawning Validation: Dynamically spawning the ninja clone must account for nearby colliders, ensuring it never embeds in terrain or clips through geometry.",
        "Dual-Door Victory Protocol: Completing a level requires both entities to independently satisfy entrance thresholds and trigger activation in the exact same timeframe.",
      ],
    },
    implementation: {
      title: "Implementation & Architectural Decisions",
      description:
        "Engineered an Observer-driven input broadcaster and dual-entity state coordination engine in Unity C# with Raycast-based ground detection.",
      architecturePoints: [
        {
          headline: "Broadcast Input Routing Architecture",
          details:
            "Created an InputBroadcastHub that decouples raw keyboard/touch reads from entity logic. Both primary player and clone subscribe to identical event channels, applying directional velocity and jump impulses in LateUpdate/FixedUpdate.",
        },
        {
          headline: "Symmetric / Asymmetric Movement Controllers",
          details:
            "Implemented modular CharacterController2D scripts with box raycasting for precise ground detection, coyote time, and jump buffering to ensure responsive platforming feel regardless of entity spacing.",
        },
        {
          headline: "Coordinated Dual-Door Validation",
          details:
            "Door sensors operate as state observers. A centralized LevelCompletionValidator monitors both door trigger volumes; only when both Character A and Character B are within their respective matched doors does the level unlock.",
        },
      ],
      codeSnippet: {
        fileName: "DualCharacterCoordinator.cs",
        language: "csharp",
        code: `using System;
using UnityEngine;

public class DualCharacterCoordinator : MonoBehaviour
{
    [SerializeField] private CharacterMovement primaryNinja;
    [SerializeField] private CharacterMovement cloneNinja;
    [SerializeField] private DoorSensor greenDoor;
    [SerializeField] private DoorSensor pinkDoor;

    public event Action OnLevelCompleted;

    private void Update()
    {
        // Sample inputs once per frame
        float horizontal = Input.GetAxisRaw("Horizontal");
        bool jump = Input.GetButtonDown("Jump");
        bool interact = Input.GetKeyDown(KeyCode.W) || Input.GetKeyDown(KeyCode.UpArrow);

        // Broadcast identical inputs to both active entities
        primaryNinja.ProcessMovement(horizontal, jump);
        if (cloneNinja != null && cloneNinja.gameObject.activeInHierarchy)
        {
            cloneNinja.ProcessMovement(horizontal, jump);
        }

        // Validate simultaneous completion trigger
        if (interact && CanCompleteLevel())
        {
            ExecuteLevelCompletion();
        }
    }

    public bool CanCompleteLevel()
    {
        bool primaryReady = greenDoor.IsOccupiedBy(primaryNinja);
        bool cloneReady = (cloneNinja != null) && pinkDoor.IsOccupiedBy(cloneNinja);
        return primaryReady && cloneReady;
    }

    private void ExecuteLevelCompletion()
    {
        greenDoor.LockDoor();
        pinkDoor.LockDoor();
        OnLevelCompleted?.Invoke();
    }
}`,
        explanation:
          "This centralized coordinator ensures single-frame input parity and strictly enforces that both doors must be occupied before victory state triggers.",
      },
    },
    results: {
      title: "Results & Measurable Impact",
      description:
        "Shipped 16 full handcrafted puzzle levels in browser WebGL, receiving enthusiastic community feedback for tight controls and creative level progression.",
      metrics: [
        {
          label: "Levels Shipped",
          value: "16 Levels",
          detail: "Handcrafted puzzles with smooth difficulty curve from tutorial to master.",
        },
        {
          label: "Input Parity",
          value: "Sub-frame",
          detail: "Zero movement deviation between linked entities on identical terrain.",
        },
        {
          label: "WebGL Size",
          value: "~20 MB",
          detail: "Brotli-compressed build loads in under 4 seconds on desktop and mobile.",
        },
      ],
      takeaways: [
        "In puzzle platformers, predictability is the foundation of player enjoyment — arbitrary physics destroy puzzle logic.",
        "Separating input reading from movement execution makes multi-character coordination clean, testable, and maintainable.",
      ],
    },
  },

  "tiny-together": {
    slug: "tiny-together",
    gameTitle: "Tiny Together",
    tagline: "Two little guys. One keyboard. Zero room for mistakes.",
    engine: "Unity (C#) / WebGL",
    genre: "2D Puzzle Platformer",
    jamOrContext: "The Brainless Game Jam — Top 10 Most Rated (550+ Entries Worldwide)",
    accentColor: "from-sky-500 to-indigo-600",
    playUrl: "/games/tiny-together",
    itchUrl: "https://kdivyanshu.itch.io/tiny-together",
    coverImage: "/images/games/tiny-together-cover.png",
    bannerImage: "/images/games/tiny-together-banner.png",
    summary:
      "A brain-bending coordination platformer where one character walks on the ground while the other traverses the ceiling, requiring synchronized spatial planning to guide both through hazard-filled rooms.",
    challenge: {
      title: "The Problem & Design Challenge",
      description:
        "Traditional platformers operate under a single downward gravity vector. In Tiny Together, the player simultaneously commands a ground-based and a ceiling-based character using one set of controls. The primary design hurdle was preventing players from becoming disoriented by ceiling physics, while creating level geometry where floor and ceiling obstacles interact harmoniously.",
      keyPoints: [
        "Inverted Physics & Collision: Implementing custom inverted gravity (-g) that correctly handles ground detection, ledge grabbing, and velocity terminal clamps without standard Unity engine bugs.",
        "Spatial Coordination: Floor gaps and ceiling spikes require opposite tactical responses from the same directional input.",
        "Instant Recovery: Hard puzzles require rapid trial and error; reload and reset cycles needed to be instantaneous.",
      ],
    },
    implementation: {
      title: "Implementation & Architectural Decisions",
      description:
        "Built a modular gravity-agnostic character controller in Unity C# paired with zero-allocation scene reset architecture.",
      architecturePoints: [
        {
          headline: "Configurable Gravity Orientation Physics",
          details:
            "Refactored CharacterMovement to accept an orientation vector (Vector2.up vs Vector2.down). Raycast checks, sprite flipping, and jump velocity vectors automatically derive from this orientation scalar.",
        },
        {
          headline: "Asynchronous Door Handshake Protocol",
          details:
            "Implemented an event-driven door system where either character can arrive first and stand on the pressure switch, but the level door only unlocks when both switches register continuous pressure.",
        },
        {
          headline: "Soft State Reset Pipeline",
          details:
            "Instead of calling SceneManager.LoadScene() (which causes WebGL stutters and garbage collection freezes), pressing 'R' triggers a soft checkpoint reset that resets entity transforms and switches in under 5 milliseconds.",
        },
      ],
      codeSnippet: {
        fileName: "InvertedGravityController.cs",
        language: "csharp",
        code: `using UnityEngine;

[RequireComponent(typeof(Rigidbody2D))]
public class InvertedGravityController : MonoBehaviour
{
    [SerializeField] private bool isCeilingWalker = false;
    [SerializeField] private float moveSpeed = 7f;
    [SerializeField] private float jumpForce = 12f;
    [SerializeField] private LayerMask groundLayer;
    [SerializeField] private Transform groundCheck;

    private Rigidbody2D rb;
    private bool isGrounded;
    private float gravitySign => isCeilingWalker ? -1f : 1f;

    private void Awake()
    {
        rb = GetComponent<Rigidbody2D>();
        // Adjust gravity scale based on orientation
        rb.gravityScale = 3f * gravitySign;
        if (isCeilingWalker)
        {
            transform.localScale = new Vector3(1, -1, 1);
        }
    }

    public void Move(float direction)
    {
        rb.velocity = new Vector2(direction * moveSpeed, rb.velocity.y);
    }

    public void Jump()
    {
        CheckGrounded();
        if (isGrounded)
        {
            rb.velocity = new Vector2(rb.velocity.x, jumpForce * gravitySign);
        }
    }

    private void CheckGrounded()
    {
        Vector2 direction = isCeilingWalker ? Vector2.up : Vector2.down;
        RaycastHit2D hit = Physics2D.Raycast(groundCheck.position, direction, 0.2f, groundLayer);
        isGrounded = hit.collider != null;
    }
}`,
        explanation:
          "By parametrizing gravity direction with `gravitySign`, identical platforming logic seamlessly operates right-side up and upside-down with zero duplicate code.",
      },
    },
    results: {
      title: "Results & Measurable Impact",
      description:
        "Tiny Together became a standout jam title, finishing in the Top 10 Most Rated submissions out of 550+ games in The Brainless Game Jam.",
      metrics: [
        {
          label: "Jam Global Rank",
          value: "Top 10",
          detail: "Ranked among the Top 10 most rated projects out of 550+ international entries.",
        },
        {
          label: "Reset Latency",
          value: "< 5ms",
          detail: "Instant soft reset eliminated scene reload latency during rapid puzzle attempts.",
        },
        {
          label: "Player Retention",
          value: "High",
          detail: "Praised by playtesters and content creators for frictionless trial-and-error pacing.",
        },
      ],
      takeaways: [
        "Invertible vector physics are vastly cleaner to maintain when designed as orientation scalars rather than duplicate inverted controllers.",
        "Instant replayability and zero load-time failure recovery elevate player perseverance through demanding puzzles.",
      ],
    },
  },

  "ulta-he-krega": {
    slug: "ulta-he-krega",
    gameTitle: "Ulta He Karega",
    tagline: "In Desi Chaos, even logic goes ULTA.",
    engine: "Unity (C#) / WebGL",
    genre: "2D Puzzle Platformer",
    jamOrContext: "LPU Game Masters Game Jam 2026 (GDAI) — Rank #2 Solo Developer",
    accentColor: "from-rose-500 to-amber-600",
    playUrl: "/games/ulta-he-krega",
    itchUrl: "https://kdivyanshu.itch.io/ulta-he-krega",
    coverImage: "/images/games/ulta-he-krega-cover.png",
    bannerImage: "/images/games/ulta-he-krega-banner.png",
    summary:
      "A chaotic puzzle-platformer inspired by Indian moms and rebellious children. You control Mother and Child simultaneously, but the child always moves in the opposite direction (ULTA).",
    challenge: {
      title: "The Problem & Design Challenge",
      description:
        "The creative concept demanded that moving right advances the Mother while simultaneously retreating the rebellious Child to the left. The engineering challenge was keeping inverted movement intuitive to reason through rather than feeling like control lag or inversion sickness. Puzzles had to be tightly scoped to 4–5 minutes of punchy, delightful 'Desi Chaos'.",
      keyPoints: [
        "Reversed Axis Intuition: Ensuring players immediately grok the opposite horizontal vector without feeling alienated by jumping or door interaction controls.",
        "Differential Goal Navigation: Mother must reach the Red Door while the Child navigates to the Yellow Door, demanding split-screen mental pathfinding.",
        "Game Jam Execution: Built from scratch under strict solo jam time constraints while polishing art, audio, and physics.",
      ],
    },
    implementation: {
      title: "Implementation & Architectural Decisions",
      description:
        "Developed an Inverted Input Matrix and synchronized dual-trigger state machine in Unity C#, paired with charming pixel art direction.",
      architecturePoints: [
        {
          headline: "Inverted Input Transformation Matrix",
          details:
            "Implemented an InputProcessor that passes unmodified movement vectors to MotherController while piping a multiplied horizontal vector `new Vector2(-hInput, vInput)` to ChildController.",
        },
        {
          headline: "Independent Jump & Wall Collision Handlers",
          details:
            "While horizontal movement is mirrored/inverted, vertical jump physics and wall collisions remain consistent. This preserves predictable jumping arcs even as characters walk in opposing directions.",
        },
        {
          headline: "Synchronized Dual-Door Victory Handshake",
          details:
            "Mother at Red Door and Child at Yellow Door independently set boolean flags. A master level script monitors both states and simultaneously plays the celebratory completion sequence when triggered.",
        },
      ],
      codeSnippet: {
        fileName: "UltaInputController.cs",
        language: "csharp",
        code: `using UnityEngine;

public class UltaInputController : MonoBehaviour
{
    [SerializeField] private PlayerController mother;
    [SerializeField] private PlayerController child;
    [SerializeField] private LevelDoor redDoor;
    [SerializeField] private LevelDoor yellowDoor;

    private void Update()
    {
        float rawHorizontal = Input.GetAxisRaw("Horizontal");
        bool jumpPressed = Input.GetButtonDown("Jump");
        bool interactPressed = Input.GetKeyDown(KeyCode.W) || Input.GetKeyDown(KeyCode.UpArrow);

        // Mother receives standard input
        mother.SetHorizontalInput(rawHorizontal);
        if (jumpPressed) mother.Jump();

        // Rebellious Child ALWAYS moves in opposite horizontal direction (ULTA!)
        float ultaHorizontal = -rawHorizontal;
        child.SetHorizontalInput(ultaHorizontal);
        if (jumpPressed) child.Jump();

        // Check synchronized victory condition
        if (interactPressed && CheckDoorsReady())
        {
            CompleteStage();
        }
    }

    private bool CheckDoorsReady()
    {
        return redDoor.IsOccupied && yellowDoor.IsOccupied;
    }

    private void CompleteStage()
    {
        redDoor.TriggerDoorOpen();
        yellowDoor.TriggerDoorOpen();
        GameManager.Instance.AdvanceToNextLevel();
    }
}`,
        explanation:
          "A simple, elegant input multiplier (`-rawHorizontal`) creates a deceptively demanding mental coordination challenge while keeping code minimal and bug-free.",
      },
    },
    results: {
      title: "Results & Measurable Impact",
      description:
        "Ulta He Karega earned Rank #2 Solo Developer against 25+ competing teams in the LPU Game Masters Game Jam 2026 organized with GDAI.",
      metrics: [
        {
          label: "Game Jam Rank",
          value: "Rank #2",
          detail: "Solo developer distinction competing against 25+ student and indie teams.",
        },
        {
          label: "Completion Pacing",
          value: "4–5 Min",
          detail: "Optimized bite-sized session length with 90%+ playthrough completion rate.",
        },
        {
          label: "WebGL Engine Load",
          value: "Instant",
          detail: "Ultra-compact asset package with zero latency on mobile and desktop browsers.",
        },
      ],
      takeaways: [
        "A culturally resonant thematic twist can transform a simple mathematical inversion into a memorable, award-winning mechanic.",
        "Scoped design that respects player time creates far stronger engagement than sprawling, unfinished feature creep.",
      ],
    },
  },
};

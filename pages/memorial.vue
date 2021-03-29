<template>
  <div class="mx-auto max-w-5xl">
    <div class="rounded p-2 max-w-5xl mx-auto">
      <h1 class="pb-4 text-xl md:text-2xl text-center font-light text-gray-300">
        Anne Feeney, Rest in Power (July 1, 1951 – February 3, 2021)
      </h1>
      <img
        src="/img/636795182553137152.jpg"
        alt=""
        class="mx-auto"
        style="max-height: 50vh"
      />
      <div>
        <h1
          class="pt-4 font-black text-3xl md:text-4xl lg:text-5xl md:max-w-md lg:max-w-lg mx-auto"
        >
          Celebrating the life and legacy of Anne Feeney
        </h1>
        <p class="text-center mx-auto mt-4 md:text-2xl">
          We look forward to celebrating the Life of Anne Feeney with you and
          including your important part of it in this virtual celebration.
        </p>
        <p
          class="italic max-w-4xl font-bold text-gray-200 text-xl mx-auto mt-2 md:text-2xl"
        >
          Virtual memorial and music event April 3, 2021 at 3pm EST / 12pm PST
          followed by a participatory “reception” with breakout rooms for
          sharing memories and song.
        </p>
        <div class="mt-8 text-lg">
          <!-- <span class="font-black text-xl">Logistical information: </span>
          the event will be held on Zoom, you will receive a link when you
          register. Do not share that link. Tell others to come to this site to
          register. Expect a 90 minute program with music and remembrances from
          Anne’s family, friends, and collaborators. After the program,
          participants will have the option to join themed breakout rooms for
          sharing memories, songs, and celebrating Anne together. -->
          <p class="text-lg md:text-xl lg:text-2xl">
            Out of respect for the precautions we are all taking to help ease
            the current health crisis, This celebration will be held virtually
            on Zoom. We look forward to a time when we can celebrate the life of
            this American hero in person. When you register to attend this
            celebration, you will receive a link. (Please, do not share that
            link, but feel free to invite others to also visit this site to
            register). You will enjoy this 90 minute honoring with powerful
            music and fond remembrances from Anne’s family, friends, and
            collaborators. After the observance, participants are invited to
            join us in smaller rooms catered to the many facets that are Anne
            Feeney. We encourage you to contribute your memories, songs, and
            photographs as we celebrate the life of our comrade.
          </p>
          <div class="text-lg bold text-center">
            <!-- <p>Anne Feeney Presente.</p> -->
            <h3 class="font-black text-2xl pb-4">“Don’t Mourn, Organize.”</h3>
          </div>
        </div>

        <div
          class="rounded"
          id="can-event-area-anne-feeney-memorial"
          style="width: 100%"
        ></div>

        <div class="grid grid-cols-2 gap-3 max-w-lg mx-auto">
          <button
            class="block mt-8 p-2 bg-gray-700 hover:bg-gray-600 rounded-md"
          >
            <a
              href="https://www.laborheritage.org/donation-2/"
              rel="noreferrer"
              style="color: white"
              target="_blank"
            >
              DONATIONS WELCOME
            </a>
          </button>
          <button
            class="block mt-8 p-2 bg-gray-700 hover:bg-gray-600 rounded-md"
          >
            <a
              href="https://www.kudoboard.com/boards/tgYWiNh9/"
              rel="noreferrer"
              style="color: white"
              target="_blank"
            >
              SHARE STORIES PHOTOS VIDEOS
            </a>
          </button>
        </div>

        <p class="mt-8 text-2xl font-bold text-gray-100 text-center">
          In lieu of flowers, please consider a donation to the Anne Feeney
          Hellraiser Fund, managed by the Labor Heritage Foundation
        </p>

        <p class="text-left text-lg md:text-xl lg:text-2xl">
          Anne Feeney was “the best labor singer in North America,” according to
          Utah Phillips, “a fearless and formidable force,” according to Rage
          Against the Machine guitarist Tom Morello, and “rocked the house”
          according to Dar Williams. She was also a mentor who generously gave
          her time and support to help jump-start the careers of many young and
          up-and-coming songwriters, activists, and artists who carry on the
          tradition of using music and art as a tool and a weapon in support of
          movements for social, economic, and environmental justice. She
          especially supported young women, queer and trans artists, working
          class artists and artists of color by sharing her wisdom, her
          contacts, and the stage. The Anne Feeney Hell Raiser Fund is a fund
          managed through the Labor Heritage Foundation that will carry on
          Anne’s work of constantly passing the torch and lifting up the voices
          of emerging activist musicians. Each year the fund will provide small
          grants to artists carrying forward Anne Feeney’s rabble rousing
          legacy. Grants between $500 - 1,000 will be used to support a
          recording project, subsidize a tour, or support in the creation of
          original music or artwork that comforts the afflicted and afflicts the
          comfortable. Funds raised will first cover burial costs, and then will
          be split between the memorial fund and the Labor Heritage Foundation.
          To apply for the grant, send an email with a one-paragraph description
          of your work and the project you need funding for, as well as a link
          to your work, to annefeeneymemorial@gmail.com
        </p>
      </div>
    </div>
    <div class="w-full">
      <iframe
        src="https://www.kudoboard.com/boards/tgYWiNh9/slideshow?embed=true&videos=true&speed=medium&title=false"
        height="800px"
        width="100%"
        allowfullscreen
        class="rounded-md mx-auto"
        sandbox="allow-scripts allow-same-origin"
        style="background-color: #121212 !important; border: none"
      ></iframe>
      <div class="text-center mx-auto mt-6">
        Share your stories, photos, and video of Anne Feeney on the Kudoboard
      </div>
      <button
        class="text-center text-lg block mt-2 p-2 bg-gray-700 hover:bg-gray-600 max-w-md rounded-md mx-auto"
      >
        <a
          target="_blank"
          href="https://www.kudoboard.com/boards/tgYWiNh9/kudos/create"
          style="color: white"
        >
          Add to Board (opens in a new window)
        </a>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      title: "Anne Feeney Online Memorial Celebration - April 3, 2021",
      description:
        "Celebrating the life and legacy of Anne Feeney (July 1, 1951 – February 3, 2021)",
    };
  },
  head() {
    return {
      script: [
        {
          src:
            "https://actionnetwork.org/widgets/v3/event/anne-feeney-memorial?format=js&source=widget",
          defer: true,
        },
      ],
      title: this.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.description,
        },
        {
          hid: "og:type",
          property: "og:type",
          content: "website",
        },
        {
          hid: "og:url",
          property: "og:url",
          content: "https://annefeeney.com/memorial/",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.title,
        },
        {
          hid: "og:site_name",
          property: "og:site_name",
          name: "og:site_name",
          content: "Anne Feeney",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.description,
        },
        {
          hid: "twitter:url",
          name: "twitter:url",
          content: "https://annefeeney.com/memorial/",
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: this.description,
        },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          hid: "og:image",
          property: "og:image",
          name: "og:image",
          content: "https://annefeeney.com/anne-feeney-memorial2.jpeg",
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: "https://annefeeney.com/anne-feeney-memorial2.jpeg",
        },
      ],
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href: "https://annefeeney.com/memorial/",
        },
        // {
        //   href: "https://actionnetwork.org/css/style-embed-v3.css",
        //   rel: "stylesheet",
        //   type: "text/css",
        // },
      ],
    };
  },
};
</script>

<style>
iframe,
.slideshow-container,
.kb-template-761 {
  background-color: #121212 !important;
}

.can_embed #can_embed_form,
.can_embed #donate_auto_modal {
  background-color: #121212 !important;
  color: white !important;

  /* font-family; */
}

/* Change link color */
.can_embed #can_embed_form a,
.can_embed #donate_auto_modal a {
  color: rgba(55, 65, 81, var(--tw-bg-opacity)) !important;
}

/* Heading colors */
.can_embed #can_embed_form h2,
.can_embed #donate_auto_modal h2 {
  color: #121212 !important;
}

.can_embed #can_embed_form h1,
.can_embed #donate_auto_modal h2,
.can_embed #can_embed_form h3,
.can_embed #donate_auto_modal h3,
.can_embed #can_embed_form h4,
.can_embed #donate_auto_modal h4,
.can_embed #can_embed_form h5,
.can_embed #donate_auto_modal h5,
.can_embed #can_embed_form h6,
.can_embed #donate_auto_modal h6 {
  color: white !important;
}

/* Welcome message background color */
.can_embed
  #can_embed_form
  #action_welcome_message
  #action_welcome_message_inner,
.can_embed
  #donate_auto_modal
  #action_welcome_message
  #action_welcome_message_inner {
  background-color: rgba(0, 0, 0, 0.1) !important;
  /* This is black @ 10% opacity */
}

/* Remove the Action Network Logo */
.can_embed #logo_wrap {
  display: none !important;
}

/* Button Background Color */
.can_embed .can_button,
.can_embed #can_embed_form input[type="submit"],
.can_embed #can_embed_form .button,
.can_embed #donate_auto_modal input[type="submit"],
.can_embed #donate_auto_modal .button {
  background-color: #4b5563 !important;
}

/* Button Background Color on Hover */
.can_embed .can_button:hover,
.can_embed #can_embed_form input[type="submit"]:hover,
.can_embed #can_embed_form .button:hover,
.can_embed #donate_auto_modal input[type="submit"]:hover,
.can_embed #donate_auto_modal .button:hover {
  background-color: #4b5563 !important;
}

/* Thank You Page Header Background Color */
.can_embed #can_embed_form #can_thank_you,
.can_embed #donate_auto_modal #can_thank_you {
  background-color: rgba(0, 0, 0, 0.1) !important;
}

/* Thank You Page Header Text Color */
.can_embed #can_embed_form #can_thank_you,
.can_embed #donate_auto_modal #can_thank_you,
.can_embed #can_embed_form #can_thank_you h1,
.can_embed #donate_auto_modal #can_thank_you h1,
.can_embed #can_embed_form #can_thank_you h4,
.can_embed #donate_auto_modal #can_thank_you h4,
.can_embed #can_embed_form #can_thank_you #action_info .action_info_user,
.can_embed #donate_auto_modal #can_thank_you #action_info .action_info_user,
.can_embed #can_embed_form #can_thank_you #action_info .action_info_user a,
.can_embed #donate_auto_modal #can_thank_you #action_info .action_info_user a {
  color: white !important;
}

/* Thank You Page Divider Line */
.can_embed #can_embed_form #can_thank_you #action_info,
.can_embed #donate_auto_modal #can_thank_you #action_info {
  border-color: black !important;
}
</style>
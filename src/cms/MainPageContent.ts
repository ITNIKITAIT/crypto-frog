import type { ButtonVariant, SupportedIcon } from "lib/ui/__types";

export const MAIN_PAGE_CONTENT = {
  banner: {
    title: "mainPageBanner.title",
    extra: [
      {
        uuid: "32аdsfsd",
        value: "mainPageBanner.extra.joinToUs",
        link: "https://t.me/frog_crpt",
      },
      {
        uuid: "3423d",
        value: "mainPageBanner.extra.ContactToUs",
        link: "https://t.me/ulyafrogivna",
      },
      {
        uuid: "fds435",
        value: "mainPageBanner.extra.PrivateChannel",
        link: "https://t.me/frog_crpt_private",
      },
    ],
    subtitle: [
      {
        uuid: "1sdfa231",
        value: "mainPageBanner.subtitle.created2BM",
      },
      {
        uuid: "2fd32",
        value: "mainPageBanner.subtitle.easytouse",
      },
      {
        uuid: "3fdswreehruy",
        value: "mainPageBanner.subtitle.mobileProxy",
      },
    ],
    description:
      "Откройте двери к миру возможностей с нашим магазином авторегов! У нас вы найдете лучшиe автореги для продвижения вашего бренда в социальных сетях. ",
    actions: [
      {
        uuid: "238764923b",
        label: "",
        link: "/",
        variant: "primary" as ButtonVariant,
      },
      {
        uuid: "asdfafsgab123",
        label: "Связаться",
        link: "https://t.me/ulyafrogivna",
        variant: "secondary" as ButtonVariant,
        icon: "telegram" as SupportedIcon,
      },
    ],
  },
};

"use client";

import { CardStack } from "./ui/card-stack";

export function PregHealthTips() {
  return (
    <div className="relative">
      <CardStack items={PREGNANCY_TIPS} />
    </div>
  );
}

const PREGNANCY_TIPS = [
  {
    id: 0,
    category: "Nutrition",
    title: "Stay Hydrated",
    content: `
Drinking plenty of water is essential during pregnancy. It helps
        maintain amniotic fluid levels, prevents constipation, and helps the
        body cope with the demands of pregnancy.
      `,
    benefits: "Mother and Baby",
    highlights: ["water", "amniotic", "fluid", "constipation"],
  },
  {
    id: 1,
    category: "Nutrition",
    title: "Eat Nutrient-Rich Foods",
    content: `Focus on a balanced diet rich in fruits, vegetables, lean proteins, and
        whole grains. These provide essential nutrients for both you and your
        baby's development.
      `,
    benefits: "Mother and Baby",
    highlights: ["fruits", "vegetables", "lean", "proteins", "whole", "grains"],
  },
  {
    id: 2,
    category: "Exercise",
    title: "Get Regular Exercise",
    content: `
        Staying active during pregnancy can help reduce discomfort, improve
        mood, and promote better sleep. Choose activities like walking,
        swimming, or prenatal yoga that are safe for pregnancy.
      `,
    benefits: "Mother",
    highlights: ["walking", "swimming", "prenatal", "yoga"],
  },
  {
    id: 3,
    category: "Supplements",
    title: "Take Prenatal Vitamins",
    content: `
        Prenatal vitamins supplement your diet with essential nutrients like
        folic acid, iron, and calcium, which are crucial for your baby's
        development. Consult with your healthcare provider to find the right
        prenatal vitamin for you.
      `,
    benefits: "Mother and Baby",
    highlights: ["prenatal", "vitamins", "folic", "acid", "iron", "calcium"],
  },
  {
    id: 4,
    category: "Wellness",
    title: "Get Adequate Rest",
    content: `
        Pregnancy can be physically and emotionally demanding. Ensure you get
        enough rest by prioritizing sleep, taking naps during the day if needed,
        and listening to your body's signals for rest.
      `,
    benefits: "Mother",
    highlights: ["sleep", "naps"],
  },
  {
    id: 5,
    category: "Healthcare",
    title: "Attend Prenatal Checkups",
    content: `
        Regular prenatal checkups with your healthcare provider are essential
        for monitoring your baby's growth and development, as well as addressing
        any concerns or complications that may arise during pregnancy.
      `,
    benefits: "Mother and Baby",
    highlights: [
      "prenatal",
      "checkups",
      "healthcare",
      "provider",
      "complications",
    ],
  },
];

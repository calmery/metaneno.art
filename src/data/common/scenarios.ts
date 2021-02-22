import { Scenario } from "~/types/exhibition";

export const ABOUT_THIS_WORLD: Scenario[] = [
  {
    branches: [
      {
        message: "めたねのおくすりってどんな人？",
        scenarios: [
          {
            message: "この世界を作った本人だよ。",
          },
          {
            message:
              "……女の子のイラストを描いたり3Dモデルを作ったりしている人みたいです。",
          },
          {
            message:
              "………ま、私もたまたまここに遊びに来てるだけだから詳しいことは知らないんだけどね。",
          },
        ],
      },
      {
        message: "何をすればいいの？",
        scenarios: [
          {
            message:
              "展示されているイラストを見て楽しんでもいいし、私みたいに他にも遊びに来てる子が何人かいるみたいだから、話しかけて会話を楽",
          },
          {
            message: "しんでみてもいいと思います…。",
          },
        ],
      },
      {
        message: "この世界での動き方を教えて",
        scenarios: [
          {
            message:
              "ここでは、とあるイラストレーターのイラストが沢山飾られています。",
          },
          {
            message:
              "イラストをタップすると作品詳細が見れたり、キャラクターに話しかけることも出来るよ。",
          },
          {
            message:
              "エリアは全部で3つ。草原、水中、雲のエリアが用意されています。",
          },
          {
            message:
              "水中と草原は自由に行き来できるけど、雲のエリアに行きたい場合はエリアの何処かにいるふわふわの羊に話しかけてね。",
          },
          {
            message: "水中と草原に行きたい場合は横にいるふわふわに話しかけて。",
          },
          {
            message:
              "またわからなくなったらいつでも聞いて。私はしばらくこの世界に居るから…。",
          },
        ],
      },
    ],
    message: "どんなことが知りたい？",
  },
];
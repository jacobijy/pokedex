// 模拟数据服务，实际项目中可替换为API调用
export const fetchPokemonList: () => Promise<IPokemonCardModel[]> = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "妙蛙种子",
          types: ["草", "毒"],
          abilities: ["茂盛", "叶绿素"],
          hiddenAbility: '',
          image: "/static/pokemon/1.png",
          stats: [
            { name: "HP", value: 45 },
            { name: "攻击", value: 49 },
            { name: "防御", value: 49 },
            { name: "特攻", value: 65 },
            { name: "特防", value: 65 },
            { name: "速度", value: 45 }
          ],
          moves: [],
          evolutionChain: [],
          description: "妙蛙种子出生时背上就背着种子。种子会随着它的成长而逐渐变大并开花。",
        },
        // 其他宝可梦数据...
      ]);
    }, 800);
  });
};
const REVIEWS = [
    {
        id: 6,
        name: '姜丽娟',
        role: '下姜村党总支书记、村委会主任',
        avatar: 'https://img.zjol.com.cn/mlf/dzw/7506/rexun/202211/W020221122341494575585.jpg',
        review: `‘千万工程’彻底改变了下姜村的面貌！`,
    },
    {
        id: 0,
        name: '朱鸿',
        role: '坛头村村民',
        avatar: 'https://p3.img.cctvpic.com/photoworkspace/contentimg/2023/07/01/2023070115560713746.jpg',
        review: `改造以后把电缆全部落地，这样村庄看上去更整齐，也更安全一些。现在，我们农村其实公厕也做得挺干净的，而且公厕都是有‘所长’，专门有人负责的，管理人员还有保洁人员，基本上没味道的，里面也全部都是智能冲洗。`,
    },
    {
        id: 2,
        name: '阳离子',
        role: '美国环保博主',
        avatar: 'https://p1.img.cctvpic.com/photoworkspace/contentimg/2023/07/01/2023070115560749822.jpg',
        review: `我确实很欣赏这个村庄如此完好地保护和维护古建筑的做法。我也很喜欢这个村庄的清洁程度，厕所前所未有的干净。他们进行垃圾分类，进行污水（净化）。这里的一切非常非常干净，这是其他村庄进行类似整治的好榜样。`,
    },
    {
        id: 3,
        name: '东衡村村民',
        role: '俞荣仁',
        avatar: 'https://p4.img.cctvpic.com/photoworkspace/contentimg/2023/04/09/2023040912205711426.jpg',
        review: `以环境为代价的发展路子，不能再走了！” 他曾是东衡村里100多个“矿老板”之一，如今在“中国钢琴之乡”洛舍镇创办了一家钢琴制造企业。`,
    },
    {
        id: 13,
        name: '俞海',
        role: '端岩村党支部书记',
        avatar: 'https://p3.img.cctvpic.com/photoworkspace/contentimg/2023/04/09/2023040912205713826.jpg',
        review: `我感到非常骄傲，端岩村通过垃圾分类，二次分拣为15类，实现了村庄环境的显著改善。`,
    },
    {
        id: 4,
        name: '张福民',
        role: '石马头村村民',
        avatar: 'https://p3.img.cctvpic.com/photoworkspace/contentimg/2023/04/09/2023040912205768364.jpg',
        review: `那时候不少企业想不通，为什么有钱不赚，现在完全理解了！`,
    },
];

// common vars
let currentCard;

// add reviews to DOM
function renderReviews() {
    const tplCard = document.querySelector("#tpl-card");
    const listCards = document.querySelector("#list-cards");

    REVIEWS.forEach((r, idx) => {
        const clone = tplCard.content.cloneNode(true);
        clone.querySelector("blockquote").innerText = `"${r.review}"`;
        clone.querySelector("[review-name]").innerText = r.name;
        clone.querySelector("[review-role]").innerText = r.role;
        clone.querySelector("[review-img]").src = r.avatar;
        if (idx === 0) {
            /// remove translate on first card
            clone.querySelector("div").classList.remove("opacity-0")
            clone.querySelector("blockquote").classList.remove("scale-0", "before:-translate-y-full")
            clone.querySelector(".details").classList.remove("scale-0", "translate-y-[150px]")
            currentCard = clone.querySelector("div");
        }
        listCards.append(clone)
    })
}

// SLIDER
function sliderInit() {
    // add reviews to DOM
    renderReviews()

    let currentİndex = 0;
    const slider = document.querySelector("#slider");
    const slides = slider.querySelectorAll(".card");
    const totalSlides = REVIEWS.length;
    const sliderButtons = document.querySelectorAll("[data-slide]");

    sliderButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {

            sliderButtons[0].classList.add("translate-x-20")
            sliderButtons[1].classList.add("-translate-x-20")
           
            // slide out old current card
            currentCard.querySelector("blockquote").classList.add("scale-0", "before:-translate-y-full")
            currentCard.querySelector(".details").classList.add("scale-0", "translate-y-[150px]")

            // move currentİndex forwards or backwards
            if (btn.getAttribute("data-slide") === "prev") {
                currentİndex = (totalSlides + currentİndex - 1) % totalSlides;
            } else {
                currentİndex = (totalSlides + currentİndex + 1) % totalSlides;
            }
            // slide in new current card
            setTimeout(() => {
                currentCard = slides[currentİndex];
                currentCard.classList.remove("opacity-0")
                currentCard.querySelector("blockquote").classList.remove("scale-0","before:-translate-y-full")
                currentCard.querySelector(".details").classList.remove("scale-0", "translate-y-[150px]");

                sliderButtons[0].classList.remove("translate-x-20")
                sliderButtons[1].classList.remove("-translate-x-20")
            }, 500)
        })
    })
}

sliderInit();
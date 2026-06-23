export interface TimoQuestion {
  id: number;
  category: string;
  questionEn: string;
  questionVn: string;
  imageUrl?: string;
  options: string[];
  optionImages?: string[];
  correctAnswer: string;
}

export type TimoRound = "preliminary" | "heat";

export interface TimoData {
  [grade: number]: {
    [round in TimoRound]: TimoQuestion[][]; // Array of tests, each test is an array of questions
  };
}

export const TIMO_DATA: TimoData = {
  1: {
    preliminary: [
      // Test 1
      [
        {
          id: 1,
          category: "Logical thinking",
          questionEn: "Given two balances below, find the heaviest type of fruit.",
          questionVn: "Cho hai chiếc cân thăng bằng dưới đây, tìm loại quả nặng nhất.",
          imageUrl: "/images/timo/grade1/test1/q1.png",
          options: ["Apple (Táo)", "Orange (Cam)", "Mango (Xoài)", "None of them (Không có)"],
          correctAnswer: "Mango (Xoài)"
        },
        {
          id: 2,
          category: "Logical thinking",
          questionEn: "In the family, Mina has 3 sisters in total. How many children does Mina’s mother have?",
          questionVn: "Mina có tất cả 3 người chị em gái. Hỏi mẹ của Mina có bao nhiêu người con?",
          options: ["2", "3", "4", "5"],
          correctAnswer: "4"
        },
        {
          id: 3,
          category: "Logical thinking",
          questionEn: "Mary looks at the calendar. Her birthday is 2 days after today and it is on Friday. Which day of the week is today?",
          questionVn: "Mary nhìn vào quyển lịch. Còn 2 ngày nữa là đến sinh nhật của cô ấy và nó đúng vào ngày thứ Sáu. Hỏi hôm nay là thứ mấy?",
          options: ["Wednesday (Thứ Tư)", "Thursday (Thứ Năm)", "Friday (Thứ Sáu)", "Tuesday (Thứ Ba)"],
          correctAnswer: "Wednesday (Thứ Tư)"
        },
        {
          id: 4,
          category: "Logical thinking",
          questionEn: "By observing the pattern, what is the number in the space (“…”) provided? 0, 5, 10, 15, …",
          questionVn: "Quan sát quy luật, tìm số thích hợp để điền vào dấu “…” phía dưới. 0, 5, 10, 15, …",
          options: ["20", "16", "19", "17"],
          correctAnswer: "20"
        },
        {
          id: 5,
          category: "Logical thinking",
          questionEn: "Ken is 15 years old and Ken’s sister is 5 years younger than him. How old is Ken’s sister now?",
          questionVn: "Ken 15 tuổi và em gái của Ken ít hơn anh ấy 5 tuổi. Hỏi hiện nay em gái của Ken mấy tuổi?",
          options: ["20", "10", "5", "15"],
          correctAnswer: "10"
        },
        {
          id: 6,
          category: "Arithmetic",
          questionEn: "Find the value of 1 + 9 + 6 + 4 + 2.",
          questionVn: "Tìm giá trị của 1 + 9 + 6 + 4 + 2.",
          options: ["12", "20", "21", "22"],
          correctAnswer: "22"
        },
        {
          id: 7,
          category: "Arithmetic",
          questionEn: "Find the value of 16 – 7 – 6.",
          questionVn: "Tìm giá trị của 16 – 7 – 6.",
          options: ["15", "3", "4", "2"],
          correctAnswer: "3"
        },
        {
          id: 8,
          category: "Arithmetic",
          questionEn: "What is the value of A such that the equation below is correct? 19 - A = 8",
          questionVn: "Giá trị của A là bao nhiêu để ta được phép tính dưới đây đúng? 19 - A = 8",
          options: ["12", "9", "10", "11"],
          correctAnswer: "11"
        },
        {
          id: 9,
          category: "Arithmetic",
          questionEn: "Calculate: 5 + 4 + 5 + 4 + 5.",
          questionVn: "Tính: 5 + 4 + 5 + 4 + 5.",
          options: ["22", "20", "23", "32"],
          correctAnswer: "23"
        },
        {
          id: 10,
          category: "Arithmetic",
          questionEn: "Find the value of 11 + 22 + 33.",
          questionVn: "Tìm giá trị của 11 + 22 + 33.",
          options: ["44", "55", "66", "77"],
          correctAnswer: "66"
        },
        {
          id: 11,
          category: "Number theory",
          questionEn: "According to the pattern below, which number should be filled in the blank? 20, 1, 19, 2, 18, 3, __",
          questionVn: "Dựa vào quy luật dãy số dưới đây để tìm số thích hợp điền vào chỗ trống. 20, 1, 19, 2, 18, 3, __",
          options: ["17", "4", "14", "7"],
          correctAnswer: "17"
        },
        {
          id: 12,
          category: "Number theory",
          questionEn: "Find the smallest number with two identical digits.",
          questionVn: "Tìm số nhỏ nhất có hai chữ số giống nhau.",
          options: ["10", "11", "99", "98"],
          correctAnswer: "11"
        },
        {
          id: 13,
          category: "Number theory",
          questionEn: "Fill the lines with “+” and “—” to make the equation below correct. 7 __ 4 __ 3 = 6",
          questionVn: "Điền dấu “+” và “—” vào chỗ trống để được phép toán đúng. 7 __ 4 __ 3 = 6",
          options: ["+, +", "+, -", "-, -", "-, +"],
          correctAnswer: "-, +"
        },
        {
          id: 14,
          category: "Number theory",
          questionEn: "Donald has 15 crayons. Minnie gives Donald 3 crayons. How many crayon(s) does Donald have now?",
          questionVn: "Donald có 15 cây bút màu. Minnie cho Donald 3 cây bút màu. Hỏi lúc này Donald có mấy cây bút màu?",
          options: ["18", "12", "19", "13"],
          correctAnswer: "18"
        },
        {
          id: 15,
          category: "Number theory",
          questionEn: "What is the value of B such that the following equation is correct? 15 + B = 11 + 8",
          questionVn: "Giá trị của B là bao nhiêu để được phép tính đúng dưới đây? 15 + B = 11 + 8",
          options: ["8", "4", "5", "6"],
          correctAnswer: "4"
        },
        {
          id: 16,
          category: "Geometry",
          questionEn: "How many squares are there in the following figure?",
          questionVn: "Hỏi có bao nhiêu hình vuông trong hình dưới đây?",
          imageUrl: "/images/timo/grade1/test1/q16.png",
          options: ["5", "6", "7", "8"],
          correctAnswer: "6"
        },
        {
          id: 17,
          category: "Geometry",
          questionEn: "How many cubes are there in the solid below?",
          questionVn: "Có bao nhiêu khối lập phương trong hình dưới đây?",
          imageUrl: "/images/timo/grade1/test1/q17.png",
          options: ["4", "6", "7", "8"],
          correctAnswer: "7"
        },
        {
          id: 18,
          category: "Geometry",
          questionEn: "Refer to the pattern below. Find the suitable figure to fill in the blank.",
          questionVn: "Theo quy luật dưới đây, tìm hình thích hợp để điền vào chỗ trống.",
          imageUrl: "/images/timo/grade1/test1/q18.png",
          options: ["A", "B", "C", "D"],
          optionImages: [
            "/images/timo/grade1/test1/q18_A.png",
            "/images/timo/grade1/test1/q18_B.png",
            "/images/timo/grade1/test1/q18_C.png",
            "/images/timo/grade1/test1/q18_D.png"
          ],
          correctAnswer: "A"
        },
        {
          id: 19,
          category: "Geometry",
          questionEn: "How many circles are there in the figure below?",
          questionVn: "Có bao nhiêu hình tròn trong hình dưới đây?",
          imageUrl: "/images/timo/grade1/test1/q19.png",
          options: ["4", "5", "6", "12"],
          correctAnswer: "5"
        },
        {
          id: 20,
          category: "Geometry",
          questionEn: "How many sides are there in the following figure?",
          questionVn: "Hình dưới đây có bao nhiêu cạnh?",
          imageUrl: "/images/timo/grade1/test1/q20.png",
          options: ["5", "7", "8", "9"],
          correctAnswer: "7"
        },
        {
          id: 21,
          category: "Combinatorics",
          questionEn: "Separate the following stars into 2 equal groups. How many stars are there in each group? ********",
          questionVn: "Chia các hình ngôi sao dưới đây thành 2 phần bằng nhau. Hỏi mỗi phần có bao nhiêu ngôi sao? ********",
          options: ["6", "5", "4", "3"],
          correctAnswer: "4"
        },
        {
          id: 22,
          category: "Combinatorics",
          questionEn: "How many even numbers are there from 13 to 30?",
          questionVn: "Hỏi có bao nhiêu số chẵn tính từ số 13 đến số 30?",
          options: ["9", "17", "16", "8"],
          correctAnswer: "9"
        },
        {
          id: 23,
          category: "Combinatorics",
          questionEn: "Adam has one $1 coin, one $2 coin and one $5 coin. At most how many toy car(s) can he buy, given that each toy car costs $2?",
          questionVn: "Adam có một đồng xu 1 đô, một đồng xu 2 đô và một đồng xu 5 đô. Hỏi cậu bé có thể mua được nhiều nhất bao nhiêu chiếc xe ô tô đồ chơi, biết rằng mỗi chiếc xe trị giá 2 đô?",
          options: ["2", "3", "4", "5"],
          correctAnswer: "4"
        },
        {
          id: 24,
          category: "Combinatorics",
          questionEn: "How many 2-digit numbers can be formed by using digits 0, 1, 4 and 8? (Each digit can be repeated).",
          questionVn: "Từ các chữ số 0, 1, 4 và 8, hỏi lập được bao nhiêu số có hai chữ số? (Các chữ số có thể lặp lại).",
          options: ["9", "16", "11", "12"],
          correctAnswer: "12"
        },
        {
          id: 25,
          category: "Combinatorics",
          questionEn: "From the pattern below, find the most suitable figure for Figure 4.",
          questionVn: "Dựa vào quy luật dưới đây, tìm đáp án thích hợp nhất cho hình số 4.",
          imageUrl: "/images/timo/grade1/test1/q25.png",
          options: ["A", "B", "C", "D"],
          optionImages: [
            "/images/timo/grade1/test1/q25_A.png",
            "/images/timo/grade1/test1/q25_B.png",
            "/images/timo/grade1/test1/q25_C.png",
            "/images/timo/grade1/test1/q25_D.png"
          ],
          correctAnswer: "C"
        }
      ],
      // Test 2
      [
        {
          id: 1,
          category: "Logical thinking",
          questionEn: "5 years later, Alice will be 12 years old. Alice’s father is 23 years elder than her. How old is Alice’s father now?",
          questionVn: "5 năm nữa thì Alice 12 tuổi. Bố của Alice hơn cô bé 23 tuổi. Hỏi bây giờ bố của Alice bao nhiêu tuổi?",
          options: [
            "40",
            "30",
            "20",
            "35"
          ],
          correctAnswer: "40"
        },
        {
          id: 2,
          category: "Logical thinking",
          questionEn: "By observing the pattern, what is the English letter in the space provided?",
          questionVn: "Quan sát quy luật dưới đây để điền chữ cái Tiếng Anh thích hợp vào chỗ trống. C  , E  , G  , I  ,  __   , M  , O",
          options: [
            "N",
            "J",
            "L",
            "K"
          ],
          correctAnswer: "N"
        },
        {
          id: 3,
          category: "Logical thinking",
          questionEn: "Observe the sequence below to replace the flag with a suitable number.",
          questionVn: "Quan sát dãy số dưới đây để thay thế lá cờ bằng số thích hợp. 3  ,  4  ,  6  ,  9  ,  13  ,  , …",
          options: [
            "18",
            "17",
            "14",
            "15"
          ],
          correctAnswer: "18"
        },
        {
          id: 4,
          category: "Logical thinking",
          questionEn: "Refer to the figure below, how many circles are there in the 5th group?",
          questionVn: "Dựa vào dãy hình dưới đây, hỏi có bao nhiêu hình tròn trong nhóm thứ 5?",
          imageUrl: "/images/timo/grade1/test2/q4.png",
          options: [
            "4",
            "8",
            "12",
            "16"
          ],
          correctAnswer: "12"
        },
        {
          id: 5,
          category: "Logical thinking",
          questionEn: "Students in a class form a line. Kim sees that there are 5 students in front of her and 3 students behind her. How many students are there in Kim’s class?",
          questionVn: "Học sinh trong một lớp xếp thành một hàng dọc. Kim thấy rằng phía trước mình có 5 bạn và phía sau mình có 3 bạn. Hỏi lớp của Kim có bao nhiêu học sinh?",
          options: [
            "8",
            "9",
            "10",
            "2"
          ],
          correctAnswer: "8"
        },
        {
          id: 6,
          category: "Arithmetic",
          questionEn: "Find the value of 0 + 2 + 4 + 6 + 8 + 10.",
          questionVn: "Tìm giá trị của 0 + 2 + 4 + 6 + 8 + 10.",
          options: [
            "30",
            "20",
            "10",
            "40",
            "4",
            "8",
            "12",
            "16"
          ],
          correctAnswer: "30"
        },
        {
          id: 7,
          category: "Arithmetic",
          questionEn: "By observing the equation, which number is being covered by the book?",
          questionVn: "Quan sát phép tính dưới đây, hỏi số nào đang bị che bởi quyển sách? 19 -   =  6",
          imageUrl: "/images/timo/grade1/test2/q7.png",
          options: [
            "13",
            "16",
            "3",
            "14"
          ],
          correctAnswer: "13"
        },
        {
          id: 8,
          category: "Arithmetic",
          questionEn: "Find the value of 2 + 3 – 4 + 2 + 3 – 4 + 2 + 3 – 4 + 2 + 3 – 4.",
          questionVn: "Tính giá trị của 2 + 3 – 4 + 2 + 3 – 4 + 2 + 3 – 4 + 2 + 3 – 4.",
          options: [
            "3",
            "1",
            "4",
            "5"
          ],
          correctAnswer: "3"
        },
        {
          id: 9,
          category: "Arithmetic",
          questionEn: "What is the value of K if the equation below is correct?",
          questionVn: "Tìm giá trị của K để được phép tính đúng dưới đây. 6 + K = 8 – 5 + 11",
          options: [
            "6",
            "8",
            "4",
            "5"
          ],
          correctAnswer: "6"
        },
        {
          id: 10,
          category: "Arithmetic",
          questionEn: "If A and B represent different digits, what is the value of A so that the equation is correct?",
          questionVn: "Biết A và B biểu diễn các chữ số khác nhau, hỏi giá trị của A là bao nhiêu để ta được phép tính đúng dưới đây?",
          imageUrl: "/images/timo/grade1/test2/q10.png",
          options: [
            "5",
            "2",
            "3",
            "4"
          ],
          correctAnswer: "5"
        },
        {
          id: 11,
          category: "Number theory",
          questionEn: "Observe the following sequence and find the smallest even number.",
          questionVn: "Quan sát dãy số dưới đây để tìm ra số chẵn nhỏ nhất. 38、20、18、15、49、26、7",
          options: [
            "7",
            "15",
            "18",
            "20"
          ],
          correctAnswer: "7"
        },
        {
          id: 12,
          category: "Number theory",
          questionEn: "A box has balls with consecutive numbers from 0 to 50 (0, 1, 2, 3, 4, …, 50). How many balls are there in the box?",
          questionVn: "Một hộp chứa các quả bóng được đánh số liên tiếp từ 0 đến 50  0, 1, 2, 3, 4, …, 50 . Hỏi có bao nhiêu quả bóng trong hộp đó?",
          options: [
            "40",
            "51",
            "25",
            "50"
          ],
          correctAnswer: "40"
        },
        {
          id: 13,
          category: "Number theory",
          questionEn: "Find the 6th number in the arithmetic sequence below.",
          questionVn: "Tìm số thứ 6 trong dãy số cách đều dưới đây. 31、29、27、25、…",
          options: [
            "24",
            "23",
            "19",
            "21"
          ],
          correctAnswer: "24"
        },
        {
          id: 14,
          category: "Number theory",
          questionEn: "Andy had 20 candies. Andy gave Betty 3 candies then Betty gave Cindy 4 candies so that 3 friends had the same number of candies. How many candies did Cindy have originally?",
          questionVn: "Andy có 20 cái kẹo. Andy cho Betty 3 cái kẹo rồi Betty lại cho Cindy 4 cái kẹo. Khi đó 3 bạn có số kẹo bằng nhau. Hỏi lúc đầu Cindy có bao nhiêu cái kẹo?",
          options: [
            "19",
            "21",
            "18",
            "13"
          ],
          correctAnswer: "19"
        },
        {
          id: 15,
          category: "Number theory",
          questionEn: "David has 3 cards. The total number of cards of David and his brother is the smallest 2- digit odd number. How many cards does David’s brother have?",
          questionVn: "David có 3 lá bài. Tổng số lá bài của David và anh trai là số lẻ nhỏ nhất có 2 chữ số. Hỏi anh trai David có bao nhiêu lá bài?",
          options: [
            "10",
            "9",
            "8",
            "7"
          ],
          correctAnswer: "10"
        },
        {
          id: 16,
          category: "Geometry",
          questionEn: "How many squares are there in the figure below?",
          questionVn: "Hỏi có bao nhiêu hình vuông trong hình dưới đây?",
          imageUrl: "/images/timo/grade1/test2/q16.png",
          options: [
            "19",
            "14",
            "15",
            "20"
          ],
          correctAnswer: "19"
        },
        {
          id: 17,
          category: "Geometry",
          questionEn: "At least how many cubes are there in the figure below?",
          questionVn: "Hỏi có ít nhất bao nhiêu hình lập phương trong hình dưới đây?",
          imageUrl: "/images/timo/grade1/test2/q17.png",
          options: [
            "12",
            "11",
            "13",
            "10"
          ],
          correctAnswer: "12"
        },
        {
          id: 18,
          category: "Geometry",
          questionEn: "How many interior angles are there in the polygon below?",
          questionVn: "Hỏi hình đa giác dưới đây có bao nhiêu góc trong? 20 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com",
          imageUrl: "/images/timo/grade1/test2/q18.png",
          options: [
            "13",
            "14",
            "15",
            "16"
          ],
          correctAnswer: "13"
        },
        {
          id: 19,
          category: "Geometry",
          questionEn: "How many line segments are there in the figure below?",
          questionVn: "Hỏi có bao nhiêu đoạn thẳng trong hình dưới đây?",
          imageUrl: "/images/timo/grade1/test2/q19.png",
          options: [
            "18",
            "20",
            "16",
            "14"
          ],
          correctAnswer: "18"
        },
        {
          id: 20,
          category: "Geometry",
          questionEn: "Refer to the beads below. How many white beads are there in the first 15 beads?",
          questionVn: "Xét chuỗi hạt dưới đây. Hỏi có bao nhiêu hạt trắng trong 15 hạt đầu tiên?",
          imageUrl: "/images/timo/grade1/test2/q20.png",
          options: [
            "15",
            "7",
            "8",
            "6"
          ],
          correctAnswer: "15"
        },
        {
          id: 21,
          category: "Combinatorics",
          questionEn: "Which number below is the greatest number?",
          questionVn: "Tìm số lớn nhất trong các số dưới đây? 2102202 、 20022021 、 20102021 、 20102120",
          options: [
            "2102202",
            "20022021",
            "20102021",
            "20102120"
          ],
          correctAnswer: "2102202"
        },
        {
          id: 22,
          category: "Combinatorics",
          questionEn: "Among the following numbers, how many odd numbers are there?",
          questionVn: "Hỏi có bao nhiêu số lẻ trong các số dưới đây? 21 , 32 , 444 , 101, 8 , 99 , 241 , 76",
          options: [
            "3",
            "5",
            "4",
            "2"
          ],
          correctAnswer: "3"
        },
        {
          id: 23,
          category: "Combinatorics",
          questionEn: "Choose 2 digits, without repetition, from 0, 2, 4, 6 and 9 to form 2-digit even numbers. How many different numbers are there?",
          questionVn: "Chọn 2 chữ số không lặp lại từ 0, 2, 4, 6 và 9 để lập thành số chẵn có 2 chữ số. Hỏi có thể lập được bao nhiêu số khác nhau như vậy?",
          options: [
            "16",
            "13",
            "14",
            "15"
          ],
          correctAnswer: "16"
        },
        {
          id: 24,
          category: "Combinatorics",
          questionEn: "Amy, Billy, Celine and Dan donated 20 coats to the homeless. Given that each person must donate at least 2 coats and their numbers of coats must be different, at most how many coats can Dan donate?",
          questionVn: "Amy, Billy, Celine và Dan quyên góp 20 chiếc áo ấm cho người vô gia cư. Biết rằng mỗi bạn cần quyên góp ít nhất 2 chiếc áo và số áo của mỗi bạn là khác nhau. Hỏi Dan có thể quyên góp nhiều nhất bao nhiêu chiếc áo? 21 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com",
          options: [
            "6",
            "14",
            "11",
            "20"
          ],
          correctAnswer: "6"
        },
        {
          id: 25,
          category: "Combinatorics",
          questionEn: "The 3 x 3 square on the right is called a ‚Magic square‛ with 9 consecutive numbers from 1 to 9 in each cell. The sum of numbers in each column or row is equal. Find the number that should be filled in the cell with question mark.",
          questionVn: "Hình vuông 3 x 3 bên phải được gọi là ‚Hình vuông ma thuật‛ gồm 9 số liên tiếp từ 1 đến 9 được điền vào mỗi ô. Tổng các số ở mỗi hàng và mỗi cột là bằng nhau. Hãy tìm số thích hợp để điền vào ô có dấu hỏi chấm.",
          imageUrl: "/images/timo/grade1/test2/q25.png",
          options: [
            "2",
            "4",
            "6",
            "8"
          ],
          correctAnswer: "2"
        }
      ],
      // Test 3
      [
        {
          id: 1,
          category: "Logical thinking",
          questionEn: "If tomorrow will be Thursday, which day of the week will be 6 days later?",
          questionVn: "Nếu ngày mai là thứ Năm, hỏi 6 ngày nữa là thứ mấy?",
          options: [
            "Friday (Thứ Sáu)",
            "Wednesday (Thứ Tư",
            "Tuesday (Thứ Ba)",
            "Saturday (Thứ Bảy)"
          ],
          correctAnswer: "Friday (Thứ Sáu)"
        },
        {
          id: 2,
          category: "Logical thinking",
          questionEn: "Peter is the youngest boy in his family. Given that his father has 4 sons and Peter has 5 brother(s) and sister(s) in total. How many daughter(s) does Peter’s father have?",
          questionVn: "Peter là cậu bé nhỏ tuổi nhất trong gia đình. Bố cậu ấy có 4 người con trai. Peter có tất cả 5 anh chị em. Vậy bố của Peter có bao nhiêu con gái?",
          options: [
            "1",
            "2",
            "3",
            "4"
          ],
          correctAnswer: "1"
        },
        {
          id: 3,
          category: "Logical thinking",
          questionEn: "20 children form a column. Alice is the 5th starting from the front. How many children behind her?",
          questionVn: "20 bạn nhỏ xếp thành một hàng dọc. Alice là người thứ 5 tính từ đầu hàng. Hỏi có bao nhiêu người phía sau bạn ấy?",
          options: [
            "15",
            "14",
            "6",
            "5"
          ],
          correctAnswer: "15"
        },
        {
          id: 4,
          category: "Logical thinking",
          questionEn: "From the pattern shown below, what is the number in the blank?",
          questionVn: "Dựa vào quy luật dưới đây, tìm số thích hợp điền vào chỗ trống? 9 、 17 、 25 、 33 、 41 、 49 、 __",
          options: [
            "58",
            "57",
            "56",
            "55"
          ],
          correctAnswer: "58"
        },
        {
          id: 5,
          category: "Logical thinking",
          questionEn: "Refer the pattern below, how many ◎ are there in the 13th group?",
          questionVn: "Dựa vào quy luật dưới đây, có bao nhiêu kí hiệu ◎ trong hình thứ 13?",
          options: [
            "20",
            "22",
            "23",
            "24"
          ],
          correctAnswer: "20",
          imageUrl: "/images/timo/grade1/test3/q5.png"
        },
        {
          id: 6,
          category: "Arithmetic",
          questionEn: "Find the value of 2 + 28 + 6 + 14 + 17 + 13.",
          questionVn: "Tìm giá trị của 2 + 28 + 6 + 14 + 17 + 13.",
          options: [
            "70",
            "80",
            "90",
            "100"
          ],
          correctAnswer: "70"
        },
        {
          id: 7,
          category: "Arithmetic",
          questionEn: "Find the value of 13 + 17 – 21. 23",
          questionVn: "KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com Tìm giá trị của 13 + 17 – 21.",
          options: [
            "8",
            "9",
            "10",
            "11"
          ],
          correctAnswer: "8"
        },
        {
          id: 8,
          category: "Arithmetic",
          questionEn: "Find the value of 9 + 8 + 7 + 6 – 5 – 4 – 3 – 2 + 1.",
          questionVn: "Tìm giá trị của 9 + 8 + 7 + 6 – 5 – 4 – 3 – 2 + 1.",
          options: [
            "14",
            "15",
            "16",
            "17"
          ],
          correctAnswer: "14"
        },
        {
          id: 9,
          category: "Arithmetic",
          questionEn: "Find the number that should be filled in the blank if this equation is correct.",
          questionVn: "Tìm số thích hợp điền vào chỗ trống để được phép tính đúng. 42 – ___ = 22",
          options: [
            "20",
            "19",
            "18",
            "21"
          ],
          correctAnswer: "20"
        },
        {
          id: 10,
          category: "Arithmetic",
          questionEn: "Refer to the puzzle, find the value of M.",
          questionVn: "Tìm giá trị của M trong phép tính dưới đây. 27 – M – M = M",
          options: [
            "8",
            "6",
            "9",
            "7"
          ],
          correctAnswer: "8"
        },
        {
          id: 11,
          category: "Number theory",
          questionEn: "Alice has 15 pencils and Peter has 7 pencils. How many pencils does Alice have to give Peter so that 2 friends have the same number of pencils?",
          questionVn: "Alice có 15 chiếc bút chì và Peter có 7 chiếc bút chì. Hỏi Alice cần cho Peter mấy chiếc bút chì để hai bạn có số bút chì bằng nhau?",
          options: [
            "4",
            "8",
            "5",
            "6"
          ],
          correctAnswer: "4"
        },
        {
          id: 12,
          category: "Number theory",
          questionEn: "Fill the lines with ‘ + ’ and ‘ – ’ to make the equation below correct.",
          questionVn: "Điền dấu ‘ + ’ và ‘ – ’ vào chỗ trống để được phép tính đúng. 2      7      5      1 = 5",
          options: [
            "2 + 7 – 5 – 1 = 5",
            "2 + 7 + 5 + 1 = 5",
            "2 + 7 + 5 – 1 = 5",
            "2 + 7 – 5 + 1 = 5"
          ],
          correctAnswer: "2 + 7 – 5 – 1 = 5"
        },
        {
          id: 13,
          category: "Number theory",
          questionEn: "Fill the lines with ‘ + ’ and ‘ – ’ to make the equation below correct.",
          questionVn: "Điền dấu ‘ + ’ và ‘ – ’ vào chỗ trống để được phép tính đúng. 2      8      4      10       3 = 13",
          options: [
            "2 + 8 + 4 – 10 + 3 = 13",
            "2 + 8 – 4 + 10 + 3 = 13",
            "2 + 8 – 4 + 10 – 3 = 13",
            "2 + 8 + 4 – 10 – 3 = 13"
          ],
          correctAnswer: "2 + 8 + 4 – 10 + 3 = 13"
        },
        {
          id: 14,
          category: "Number theory",
          questionEn: "The numbers below form an arithmetic sequence. What is the 7th number?",
          questionVn: "Các số dưới đây tạo thành một dãy số cách đều. Hỏi số thứ 7 là bao nhiêu? 58、51、44、37、30、…",
          options: [
            "19",
            "18",
            "17",
            "16"
          ],
          correctAnswer: "19"
        },
        {
          id: 15,
          category: "Number theory",
          questionEn: "Determine the sum 1 + 3 + 5 + 7 + 9 + 11 is odd or even.",
          questionVn: "Hỏi tổng 1 + 3 + 5 + 7 + 9 + 11 là số lẻ hay số chẵn?",
          options: [
            "Even (Chẵn)",
            "Odd (Lẻ)",
            "Neither odd nor even (Không chẵn không lẻ)",
            "Both odd and even (Vừa chẵn vừa lẻ)"
          ],
          correctAnswer: "Even (Chẵn)"
        },
        {
          id: 16,
          category: "Geometry",
          questionEn: "How many squares are there in the figure below?",
          questionVn: "Có bao nhiêu hình vuông trong hình vẽ dưới đây?",
          options: [
            "10",
            "11",
            "12",
            "13"
          ],
          correctAnswer: "10",
          imageUrl: "/images/timo/grade1/test3/q16.png"
        },
        {
          id: 17,
          category: "Geometry",
          questionEn: "Candace places some cubes on top of each other to form the figure below. At least how many cubes does she use?",
          questionVn: "Candace xếp các khối lập phương chồng lên nhau để được hình bên dưới. Hỏi cô ấy đã dùng ít nhất bao nhiêu khối lập phương?",
          options: [
            "6",
            "7",
            "8",
            "9"
          ],
          correctAnswer: "6",
          imageUrl: "/images/timo/grade1/test3/q17.png"
        },
        {
          id: 18,
          category: "Geometry",
          questionEn: "How many interior angles are there in the polygon below?",
          questionVn: "Đa giác dưới đây có bao nhiêu góc trong?",
          options: [
            "16",
            "17",
            "18",
            "19"
          ],
          correctAnswer: "16",
          imageUrl: "/images/timo/grade1/test3/q18.png"
        },
        {
          id: 19,
          category: "Geometry",
          questionEn: "By observing the pattern from left to right, what is the missing figure?",
          questionVn: "Quan sát quy luật từ trái sang phải, tìm hình bị thiếu. ■、▲、★、▲、■、■、▲、★、▲、■、■、？、★、▲、■",
          options: [
            "■",
            "▲",
            "★",
            "◎"
          ],
          correctAnswer: "■",
          imageUrl: "/images/timo/grade1/test3/q19.png"
        },
        {
          id: 20,
          category: "Geometry",
          questionEn: "According to the pattern below, what is the figure in the space provided?",
          questionVn: "Dựa vào quy luật dưới đây, tìm hình vẽ bị thiếu.",
          options: [
            "A",
            "B",
            "C",
            "D"
          ],
          optionImages: [
            "/images/timo/grade1/test3/q20_A.png",
            "/images/timo/grade1/test3/q20_B.png",
            "/images/timo/grade1/test3/q20_C.png",
            "/images/timo/grade1/test3/q20_D.png"
          ],
          correctAnswer: "A",
          imageUrl: "/images/timo/grade1/test3/q20.png"
        },
        {
          id: 21,
          category: "Combinatorics",
          questionEn: "Which number below is the greatest?",
          questionVn: "Số nào dưới đây là lớn nhất? 20190513 、 20195479、 20189845 、 20196490",
          options: [
            "20190513",
            "20195479",
            "20189845",
            "20196490"
          ],
          correctAnswer: "20190513"
        },
        {
          id: 22,
          category: "Combinatorics",
          questionEn: "Choose 2 digits, without repetition, from 5, 1, 0 and 3 to form 2-digit odd numbers. How many different numbers are there?",
          questionVn: "Chọn 2 chữ số khác nhau từ các chữ số 5, 1, 0 và 3 để tạo thành số lẻ có 2 chữ số. Hỏi có thể tạo được bao nhiêu số khác nhau?",
          options: [
            "6",
            "5",
            "4",
            "3"
          ],
          correctAnswer: "6"
        },
        {
          id: 23,
          category: "Combinatorics",
          questionEn: "According to the following numbers, what is the difference between the number of odd number(s) and even number(s)?",
          questionVn: "Quan sát các số dưới đây, tìm hiệu giữa số lượng số lẻ và số lượng số chẵn. 1, 7, 13, 14, 21, 27, 30, 45",
          options: [
            "1",
            "2",
            "3",
            "4"
          ],
          correctAnswer: "1"
        },
        {
          id: 24,
          category: "Combinatorics",
          questionEn: "What is the largest 3-digit even number formed by choosing 3 digits from 0, 5, 1 and 3?",
          questionVn: "Số chẵn lớn nhất có 3 chữ số có thể tạo được từ 3 trong 5 chữ số 0, 5, 1 và 3 là số nào?",
          options: [
            "531",
            "530",
            "103",
            "105"
          ],
          correctAnswer: "531"
        },
        {
          id: 25,
          category: "Combinatorics",
          questionEn: "Andy, Bella and Charles make 7 cakes in total. Given that each person makes at least one cake and their numbers of cake(s) must be different. Andy makes the most cakes. How many cakes does Andy make?",
          questionVn: "Andy, Bella và Charles làm được tất cả 7 cái bánh. Mỗi người làm ít nhất một cái bánh và số bánh của các bạn là khác nhau. Andy làm được nhiều bánh nhất. Hỏi Andy làm được bao nhiêu cái bánh?",
          options: [
            "5",
            "4",
            "3",
            "7"
          ],
          correctAnswer: "5"
        }
      ],
      // Test 4
      [
        {
          id: 1,
          category: "Logical thinking",
          questionEn: "Given that the day before yesterday was Saturday, which day of the week will it be tomorrow?",
          questionVn: "Biết rằng ngày hôm kia là thứ Bảy, vậy ngày mai là thứ mấy?",
          options: [
            "Friday (Thứ Sáu)",
            "Tuesday (Thứ Ba)",
            "Monday (Thứ Hai)",
            "Saturday (Thứ Bảy)"
          ],
          correctAnswer: "Friday (Thứ Sáu)"
        },
        {
          id: 2,
          category: "Logical thinking",
          questionEn: "What is the greatest possible number of Fridays during February?",
          questionVn: "Trong tháng Hai có nhiều nhất bao nhiêu thứ Sáu?",
          options: [
            "2",
            "3",
            "4",
            "5"
          ],
          correctAnswer: "2"
        },
        {
          id: 3,
          category: "Logical thinking",
          questionEn: "Tommy needs 5 minutes to cook a bowl of noodles. He can cook at most 2 bowls of noodles at the same time. At least how many minutes does he need to cook 3 bowls of noodles?",
          questionVn: "Tommy cần 5 phút để nấu một bát mỳ. Bạn ấy có thể nấu nhiều nhất 2 bát mỳ cùng lúc. Hỏi Tommy cần ít nhất bao nhiêu phút để nấu 3 bát mỳ?",
          options: [
            "10",
            "8",
            "15",
            "11"
          ],
          correctAnswer: "10"
        },
        {
          id: 4,
          category: "Logical thinking",
          questionEn: "According to the pattern shown below, what is the number in the blank (‚?‛)?",
          questionVn: "Dựa vào quy luật dưới đây, tìm số thích hợp điền vào dấu ‚?‛. 55 、 45 、 36 、 28 、 21 、 15 、?",
          options: [
            "8",
            "9",
            "10",
            "11"
          ],
          correctAnswer: "8"
        },
        {
          id: 5,
          category: "Logical thinking",
          questionEn: "Consider the pattern below. How many  are there in the next group?",
          questionVn: "Dựa vào quy luật dưới đây, hỏi có bao nhiêu dấu  trong hình tiếp theo?",
          options: [
            "8",
            "9",
            "10",
            "11"
          ],
          correctAnswer: "8",
          imageUrl: "/images/timo/grade1/test4/q5.png"
        },
        {
          id: 6,
          category: "Arithmetic",
          questionEn: "Find the value of 7 + 4 + 5 + 3 + 2 + 6 + 8.",
          questionVn: "Tìm giá trị của 7 + 4 + 5 + 3 + 2 + 6 + 8.",
          options: [
            "33",
            "34",
            "35",
            "36"
          ],
          correctAnswer: "33"
        },
        {
          id: 7,
          category: "Arithmetic",
          questionEn: "Find the value of 18 – 9 + 12.",
          questionVn: "Tìm giá trị của 18 – 9 + 12.",
          options: [
            "20",
            "21",
            "18",
            "17"
          ],
          correctAnswer: "20"
        },
        {
          id: 8,
          category: "Arithmetic",
          questionEn: "Find the value of 7 + 7 + 7 + 7 + 7 – 7 – 7 – 7 – 7.",
          questionVn: "Tìm giá trị của 7 + 7 + 7 + 7 + 7 – 7 – 7 – 7 – 7.",
          options: [
            "0",
            "5",
            "6",
            "7"
          ],
          correctAnswer: "0"
        },
        {
          id: 9,
          category: "Arithmetic",
          questionEn: "What is the number that should be filled in the blank?",
          questionVn: "Tìm số thích hợp điền vào chỗ trống. 21 +            = 41",
          options: [
            "23",
            "20",
            "21",
            "22"
          ],
          correctAnswer: "23"
        },
        {
          id: 10,
          category: "Arithmetic",
          questionEn: "What is the value of C if the equation below is correct?",
          questionVn: "Tìm giá trị của C để được phép tính đúng dưới đây. 14 – C = C",
          options: [
            "9",
            "8",
            "7",
            "6"
          ],
          correctAnswer: "9"
        },
        {
          id: 11,
          category: "Number theory",
          questionEn: "Amy has 17 apples and John has 9 apples. How many apples does Amy have to give to John to make them have the same number of apples?",
          questionVn: "Amy có 17 quả táo, John có 9 quả táo. Hỏi Amy cần cho John bao nhiêu quả táo để hai người có số táo bằng nhau?",
          options: [
            "4",
            "8",
            "5",
            "6"
          ],
          correctAnswer: "4"
        },
        {
          id: 12,
          category: "Number theory",
          questionEn: "Fill the lines with ‘ + ‘ and ‘ – ‘ to make the equation below correct.",
          questionVn: "Điền dấu ‘ + ’ và ‘ – ’ vào chỗ trống để được phép tính đúng. 2      3      4      8 = 1",
          options: [
            "2 + 3 + 4 + 8 = 1",
            "2 + 3 + 4 – 8 = 1",
            "2 + 3 – 4 + 8 = 1",
            "2 + 3 – 4 – 8 = 1"
          ],
          correctAnswer: "2 + 3 + 4 + 8 = 1"
        },
        {
          id: 13,
          category: "Number theory",
          questionEn: "Fill the lines with ‘ + ’ and ‘ – ’ to make the equation below correct.",
          questionVn: "Điền dấu ‘ + ’ và ‘ – ’ vào chỗ trống để được phép tính đúng. 1      3      6      8      9 = 11",
          options: [
            "1 + 3 + 6 + 8 – 9 = 11",
            "1 + 3 + 6 + 8 + 9 =11",
            "1 + 3 – 6 + 8 + 9 = 11",
            "1 + 3 + 6 – 8 + 9 = 11"
          ],
          correctAnswer: "1 + 3 + 6 + 8 – 9 = 11"
        },
        {
          id: 14,
          category: "Number theory",
          questionEn: "How many two-digit numbers having the unit digit 2 are there?",
          questionVn: "Có bao nhiêu số có hai chữ số mà chữ số hàng đơn vị là 2?",
          options: [
            "9",
            "10",
            "6",
            "8"
          ],
          correctAnswer: "9"
        },
        {
          id: 15,
          category: "Number theory",
          questionEn: "Determine 2 + 5 + 8 + 11 + 14 is odd or even.",
          questionVn: "Hỏi 2 + 5 + 8 + 11 + 14 là số lẻ hay số chẵn?",
          options: [
            "Even (Chẵn)",
            "Odd (Lẻ)"
          ],
          correctAnswer: "Even (Chẵn)"
        },
        {
          id: 16,
          category: "Geometry",
          questionEn: "How many squares are there in the figure below?",
          questionVn: "Có bao nhiêu hình vuông trong hình vẽ bên dưới?",
          options: [
            "8",
            "9",
            "10",
            "11"
          ],
          correctAnswer: "8",
          imageUrl: "/images/timo/grade1/test4/q16.png"
        },
        {
          id: 17,
          category: "Geometry",
          questionEn: "At least how many cubes are there in the figure below?",
          questionVn: "Có ít nhất bao nhiêu khối lập phương trong hình dưới đây?",
          options: [
            "8",
            "9",
            "10",
            "11"
          ],
          correctAnswer: "8",
          imageUrl: "/images/timo/grade1/test4/q17.png"
        },
        {
          id: 18,
          category: "Geometry",
          questionEn: "How many sides are there in the polygon below?",
          questionVn: "Đa giác dưới đây có bao nhiêu cạnh?",
          options: [
            "13",
            "14",
            "15",
            "16"
          ],
          correctAnswer: "13",
          imageUrl: "/images/timo/grade1/test4/q18.png"
        },
        {
          id: 19,
          category: "Geometry",
          questionEn: "According to the pattern shown below, what is the figure in the space (‚___‛) provided?",
          questionVn: "Dựa vào quy luật dưới đây, tìm hình thích hợp để điền vào chỗ trống (___)?",
          options: [
            "△",
            "□",
            "○",
            "▲"
          ],
          correctAnswer: "△",
          imageUrl: "/images/timo/grade1/test4/q19.png"
        },
        {
          id: 20,
          category: "Geometry",
          questionEn: "According to the pattern shown below, what is the figure in the space provided?",
          questionVn: "Dựa vào quy luật dưới đây, tìm hình vẽ thích hợp để điền vào chỗ trống.",
          options: [
            "A",
            "B",
            "C",
            "D"
          ],
          optionImages: [
            "/images/timo/grade1/test4/q20_A.png",
            "/images/timo/grade1/test4/q20_B.png",
            "/images/timo/grade1/test4/q20_C.png",
            "/images/timo/grade1/test4/q20_D.png"
          ],
          correctAnswer: "A",
          imageUrl: "/images/timo/grade1/test4/q20.png"
        },
        {
          id: 21,
          category: "Combinatorics",
          questionEn: "Which number below is the smallest?",
          questionVn: "Số nào dưới đây là nhỏ nhất? 20201110 、 20112010、 20211020 、 20101021",
          options: [
            "20201110",
            "20112010",
            "20211020",
            "20101021"
          ],
          correctAnswer: "20201110"
        },
        {
          id: 22,
          category: "Combinatorics",
          questionEn: "Choose 2 digits, without repetition, from 1, 0, 3 and 9 to form two-digit numbers. How many different numbers are there?",
          questionVn: "Chọn hai chữ số khác nhau từ các chữ số 1, 0, 3 và 9 để tạo thành số có hai chữ số. Hỏi có thể được bao nhiêu số khác nhau như vậy?",
          options: [
            "10",
            "9",
            "8",
            "7"
          ],
          correctAnswer: "10"
        },
        {
          id: 23,
          category: "Combinatorics",
          questionEn: "According to the following numbers, how many even number(s) is / are there?",
          questionVn: "Trong các số dưới đây có bao nhiêu số chẵn? 1, 3, 4, 7, 11, 18, 29, 47",
          options: [
            "4",
            "3",
            "2",
            "1"
          ],
          correctAnswer: "4"
        },
        {
          id: 24,
          category: "Combinatorics",
          questionEn: "What is the greatest 3-digit number formed by digits 2, 0, 4 and 8? (Each digit cannot be used more than once).",
          questionVn: "Số lớn nhất có 3 chữ số được tạo bởi các chữ số 2, 0, 4 và 8 là số nào? (Mỗi chữ số không được dùng quá 1 lần).",
          options: [
            "284",
            "208",
            "842",
            "840"
          ],
          correctAnswer: "284"
        },
        {
          id: 25,
          category: "Combinatorics",
          questionEn: "Mina would like to pick up all apples on the floor. What is the minimum distance in meter that he needs to travel? The distance between two adjacent apples is 1 meter and he can only go straight, turn left or turn right.",
          questionVn: "Mina muốn lấy được tất cả số táo trên sàn. Hỏi bạn ấy cần đi quãng đường ngắn nhất là bao nhiêu mét? Biết rằng khoảng cách giữa hai quả táo liền kề nhau là 1 mét và bạn ấy chỉ có thể đi thẳng, rẽ trái hoặc rẽ phải.",
          options: [
            "15",
            "14",
            "17",
            "16"
          ],
          correctAnswer: "15"
        }
      ],
      // Test 5
      [
        {
          id: 1,
          category: "Logical thinking",
          questionEn: "If the next month is August, find the last month.",
          questionVn: "Nếu tháng sau là tháng Tám, hỏi tháng trước là tháng nào?",
          options: [
            "June (Tháng Sáu)",
            "July (Tháng Bảy)",
            "August (Tháng Tám)",
            "December (Tháng Mười hai)"
          ],
          correctAnswer: "June (Tháng Sáu)"
        },
        {
          id: 2,
          category: "Logical thinking",
          questionEn: "From the pattern shown below, what is the animal figure in the blank?",
          questionVn: "Dựa vào quy luật dưới đây, tìm hình con vật thích hợp để điền vào chỗ trống.",
          options: [
            "A",
            "B",
            "C",
            "D"
          ],
          optionImages: [
            "/images/timo/grade1/test5/q2_A.png",
            "/images/timo/grade1/test5/q2_B.png",
            "/images/timo/grade1/test5/q2_C.png",
            "/images/timo/grade1/test5/q2_D.png"
          ],
          correctAnswer: "A",
          imageUrl: "/images/timo/grade1/test5/q2.png"
        },
        {
          id: 3,
          category: "Logical thinking",
          questionEn: "Mr. David has a farm. His farm has 5 cows and 5 chickens. How many legs do these animals have in the farm in total?",
          questionVn: "Bác David có một nông trại. Trong nông trại có 5 con bò và 5 con gà. Hỏi tổng số chân của những con vật trong nông trại là bao nhiêu?",
          options: [
            "29",
            "30",
            "31",
            "32"
          ],
          correctAnswer: "29"
        },
        {
          id: 4,
          category: "Logical thinking",
          questionEn: "From the pattern shown below, what is the number in the blank?",
          questionVn: "Dựa vào quy luật dưới đây, tìm số điền vào chỗ trống. 12 、 13 、 11 、 14 、 10 、 15 、 __",
          options: [
            "7",
            "8",
            "9",
            "10"
          ],
          correctAnswer: "7"
        },
        {
          id: 5,
          category: "Logical thinking",
          questionEn: "From the pattern below, how many symbols  are there in the 5th group?",
          questionVn: "Dựa theo quy luật, hỏi có bao nhiêu kí hiệu  trong nhóm thứ 5?",
          options: [
            "2",
            "3",
            "4",
            "5"
          ],
          correctAnswer: "2",
          imageUrl: "/images/timo/grade1/test5/q5.png"
        },
        {
          id: 6,
          category: "Arithmetic",
          questionEn: "Find the value of 2 + 4 + 6 + 8 + 10.",
          questionVn: "Tìm giá trị của 2 + 4 + 6 + 8 + 10.",
          options: [
            "10",
            "20",
            "30",
            "40"
          ],
          correctAnswer: "10"
        },
        {
          id: 7,
          category: "Arithmetic",
          questionEn: "Find the value of 10 – 8 + 6 – 4 + 2.",
          questionVn: "Tìm giá trị của 10 – 8 + 6 – 4 + 2.",
          options: [
            "6",
            "4",
            "8",
            "10"
          ],
          correctAnswer: "6"
        },
        {
          id: 8,
          category: "Arithmetic",
          questionEn: "Find the value of 9 + 2 + 1 + 8 + 3.",
          questionVn: "Tìm giá trị của 9 + 2 + 1 + 8 + 3.",
          options: [
            "20",
            "22",
            "23",
            "21"
          ],
          correctAnswer: "20"
        },
        {
          id: 9,
          category: "Arithmetic",
          questionEn: "What is the number that should be filled in the blank?",
          questionVn: "Tìm số thích hợp để điền vào chỗ trống. 18 -           = 4",
          options: [
            "15",
            "14",
            "16",
            "12"
          ],
          correctAnswer: "15"
        },
        {
          id: 10,
          category: "Arithmetic",
          questionEn: "What is the value of A + B if the equation below is correct?",
          questionVn: "Tìm giá trị của A + B biết rằng phép tính dưới đây là đúng.",
          options: [
            "1",
            "4",
            "5",
            "6"
          ],
          correctAnswer: "1",
          imageUrl: "/images/timo/grade1/test5/q10.png"
        },
        {
          id: 11,
          category: "Number theory",
          questionEn: "How many rabbits should be moved from left to right to get the same number of rabbits in both gardens?",
          questionVn: "Cần chuyển bao nhiêu con thỏ từ bên trái sang bên phải để hai khu vườn có số thỏ bằng nhau?",
          options: [
            "1",
            "2",
            "3",
            "4"
          ],
          correctAnswer: "1",
          imageUrl: "/images/timo/grade1/test5/q11.png"
        },
        {
          id: 12,
          category: "Number theory",
          questionEn: "Fill the lines with ‘ + ‘ and ‘ – ‘ to make the equation below correct.",
          questionVn: "Điền các dấu ‘ + ’ và ‘ – ’ vào chỗ trống để được phép tính đúng. 3      6      4       7 = 12",
          options: [
            "3 + 6 + 4 – 7 = 12",
            "3 + 6 – 4 – 7 = 12",
            "3 + 6 – 4 + 7 = 12",
            "3 + 6 + 4 + 7 = 12"
          ],
          correctAnswer: "3 + 6 + 4 – 7 = 12"
        },
        {
          id: 13,
          category: "Number theory",
          questionEn: "Fill the lines with ‘ + ‘ and ‘ – ‘ to make the equation below correct.",
          questionVn: "Điền các dấu ‘ + ’ và ‘ – ’ vào chỗ trống để được phép tính đúng. 2      5      6      1      3 = 15",
          options: [
            "2 + 5 – 6 + 1 – 3 = 15",
            "2 + 5 + 6 – 1 – 3 = 15",
            "2 + 5 + 6 – 1 + 3 = 15",
            "2 + 5 – 6 + 1 + 3 = 15"
          ],
          correctAnswer: "2 + 5 – 6 + 1 – 3 = 15"
        },
        {
          id: 14,
          category: "Number theory",
          questionEn: "Four of five numbers 2, 4, 5, 6, 9 are written into four boxes so that the calculation below is correct. Which number was not used?",
          questionVn: "Bốn trong năm số 2, 4, 5, 6, 9 được viết vào bốn ô dưới đây để được phép tính đúng. Hỏi số nào không được sử dụng?",
          options: [
            "4",
            "5",
            "6",
            "9"
          ],
          correctAnswer: "4",
          imageUrl: "/images/timo/grade1/test5/q14.png"
        },
        {
          id: 15,
          category: "Number theory",
          questionEn: "Determine the result of 8 + 5 + 6 – 4 – 3 + 2 – 7 is odd or even.",
          questionVn: "Hỏi kết quả của phép tính 8 + 5 + 6 – 4 – 3 + 2 – 7 là số lẻ hay số chẵn?",
          options: [
            "Even (Chẵn)",
            "Odd (Lẻ)",
            "Neither odd nor even (Không chẵn không lẻ)",
            "Both odd and even (Vừa chẵn vừa lẻ)"
          ],
          correctAnswer: "Even (Chẵn)"
        },
        {
          id: 16,
          category: "Geometry",
          questionEn: "How many squares are there in the following figure?",
          questionVn: "Có bao nhiêu hình vuông trong hình dưới đây?",
          options: [
            "12",
            "16",
            "17",
            "18"
          ],
          correctAnswer: "12",
          imageUrl: "/images/timo/grade1/test5/q16.png"
        },
        {
          id: 17,
          category: "Geometry",
          questionEn: "Some cubes are placed on top of each other. At least how many cubes are there in the figure below?",
          questionVn: "Một số khối lập phương được xếp chồng lên nhau. Hỏi có ít nhất bao nhiêu khối lập phương trong hình bên dưới?",
          options: [
            "13",
            "12",
            "11",
            "14"
          ],
          correctAnswer: "13",
          imageUrl: "/images/timo/grade1/test5/q17.png"
        },
        {
          id: 18,
          category: "Geometry",
          questionEn: "How many sides are there in the polygon below?",
          questionVn: "Đa giác dưới đây có bao nhiêu cạnh?",
          options: [
            "5",
            "6",
            "7",
            "8"
          ],
          correctAnswer: "5",
          imageUrl: "/images/timo/grade1/test5/q18.png"
        },
        {
          id: 19,
          category: "Geometry",
          questionEn: "According to the pattern shown below, what is the shape in the top of 4th figure?",
          questionVn: "Theo quy luật dưới đây, khối nào nằm ở phía trên cùng trong hình thứ 4?",
          options: [
            "A",
            "B",
            "C",
            "D"
          ],
          optionImages: [
            "/images/timo/grade1/test5/q19_A.png",
            "/images/timo/grade1/test5/q19_B.png",
            "/images/timo/grade1/test5/q19_C.png",
            "/images/timo/grade1/test5/q19_D.png"
          ],
          correctAnswer: "A",
          imageUrl: "/images/timo/grade1/test5/q19.png"
        },
        {
          id: 20,
          category: "Geometry",
          questionEn: "According to the pattern shown below, what is the figure in the space?",
          questionVn: "Dựa vào quy luật dưới đây, tìm hình vẽ thích hợp điền vào chỗ trống. _______",
          options: [
            "A",
            "B",
            "C",
            "D"
          ],
          optionImages: [
            "/images/timo/grade1/test5/q20_A.png",
            "/images/timo/grade1/test5/q20_B.png",
            "/images/timo/grade1/test5/q20_C.png",
            "/images/timo/grade1/test5/q20_D.png"
          ],
          correctAnswer: "A",
          imageUrl: "/images/timo/grade1/test5/q20.png"
        },
        {
          id: 21,
          category: "Combinatorics",
          questionEn: "Which number below is the smallest even number?",
          questionVn: "Số nào sau đây là số chẵn nhỏ nhất? 20203924 、 20110019、 20211014 、 20101030",
          options: [
            "20203924",
            "20110019",
            "20211014",
            "20101030"
          ],
          correctAnswer: "20203924"
        },
        {
          id: 22,
          category: "Combinatorics",
          questionEn: "Forming 2-digit numbers using 0, 1, 2, 3. These numbers have to be greater than 11 and smaller than 30. Every number is made up of two different digits. How many different number(s) is / are there?",
          questionVn: "Sử dụng các chữ số 0, 1, 2, 3 để tạo thành các số có 2 chữ số lớn hơn 11 và nhỏ hơn 30. Mỗi số đều gồm hai chữ số phân biệt. Hỏi có tất cả bao nhiêu số như vậy?",
          options: [
            "10",
            "4",
            "5",
            "7"
          ],
          correctAnswer: "10"
        },
        {
          id: 23,
          category: "Combinatorics",
          questionEn: "Among the following numbers, how many odd number(s) is / are there?",
          questionVn: "Trong các số dưới đây có bao nhiêu số lẻ? 12, 45, 7, 16, 22, 15, 10, 68",
          options: [
            "1",
            "2",
            "3",
            "4"
          ],
          correctAnswer: "1"
        },
        {
          id: 24,
          category: "Combinatorics",
          questionEn: "What is the smallest 3-digit number formed by digits 0, 2, 3 and 7? (Each digit cannot be used more than once).",
          questionVn: "Số nhỏ nhất có 3 chữ số được tạo bởi các chữ số 0, 2, 3 và 7 là số nào? (Mỗi chữ số được sử dụng không quá 1 lần).",
          options: [
            "203",
            "302",
            "320",
            "730"
          ],
          correctAnswer: "203"
        },
        {
          id: 25,
          category: "Combinatorics",
          questionEn: "Find the value of ★.",
          questionVn: "Tìm giá trị của ★.",
          options: [
            "4",
            "6",
            "5",
            "3"
          ],
          correctAnswer: "4",
          imageUrl: "/images/timo/grade1/test5/q25.png"
        }
      ]
    ],
    heat: [
  [
    {
      "id": 1,
      "category": "Logical thinking",
      "questionEn": "Edward is 18 years old now and Kenny will be 6 years old 4 years later. What is the difference between their ages?",
      "questionVn": "Now Hiện tại Later: Sau; Difference: Hiệu Age Tuổi.",
      "imageUrl": "/images/timo/grade1/final1/q1.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final1/q1_A.png",
        "/images/timo/grade1/final1/q1_B.png",
        "/images/timo/grade1/final1/q1_C.png",
        "/images/timo/grade1/final1/q1_D.png"
      ]
    },
    {
      "id": 2,
      "category": "Logical thinking",
      "questionEn": "According to the pattern shown below, what is the English letter in the space (‚__‛) provided?",
      "questionVn": "Pattern: Quy luật; English letter: Chữ cái Tiếng Anh; Space: Chỗ trống.",
      "imageUrl": "/images/timo/grade1/final1/q2.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final1/q2_A.png",
        "/images/timo/grade1/final1/q2_B.png",
        "/images/timo/grade1/final1/q2_C.png",
        "/images/timo/grade1/final1/q2_D.png"
      ]
    },
    {
      "id": 3,
      "category": "Logical thinking",
      "questionEn": "If tomorrow will be Thursday, which day of the week will 11 days later be?",
      "questionVn": "Tomorrow: Ngày mai; Thursday: Thứ Năm Day of the week Thứ  ater Sau.",
      "imageUrl": "/images/timo/grade1/final1/q3.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final1/q3_A.png",
        "/images/timo/grade1/final1/q3_B.png",
        "/images/timo/grade1/final1/q3_C.png",
        "/images/timo/grade1/final1/q3_D.png"
      ]
    },
    {
      "id": 4,
      "category": "Logical thinking",
      "questionEn": "According to the pattern below, what is the number in the space?",
      "questionVn": "Pattern: Quy luật; Space: Chỗ trống. 4, 12, 20, 28, 36, __",
      "imageUrl": "/images/timo/grade1/final1/q4.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final1/q4_A.png",
        "/images/timo/grade1/final1/q4_B.png",
        "/images/timo/grade1/final1/q4_C.png",
        "/images/timo/grade1/final1/q4_D.png"
      ]
    },
    {
      "id": 5,
      "category": "Logical thinking",
      "questionEn": "From the pattern below, how many ＃ is / are there in the 5th Group?",
      "questionVn": "Pattern: Quy luật.  Arithmetic / Số học",
      "imageUrl": "/images/timo/grade1/final1/q5.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final1/q5_A.png",
        "/images/timo/grade1/final1/q5_B.png",
        "/images/timo/grade1/final1/q5_C.png",
        "/images/timo/grade1/final1/q5_D.png"
      ]
    },
    {
      "id": 6,
      "category": "Logical thinking",
      "questionEn": "If A represents the same 1-digit number, what is the value of A if the equation is correct?",
      "questionVn": "Represent: Biểu diễn; 1-digit number: Số 1 chữ số; Equation: Phép tính.   36 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com",
      "imageUrl": "/images/timo/grade1/final1/q6.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final1/q6_A.png",
        "/images/timo/grade1/final1/q6_B.png",
        "/images/timo/grade1/final1/q6_C.png",
        "/images/timo/grade1/final1/q6_D.png"
      ]
    },
    {
      "id": 7,
      "category": "Logical thinking",
      "questionEn": "Find the value of .",
      "questionVn": "Value: Giá trị.",
      "imageUrl": "/images/timo/grade1/final1/q7.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final1/q7_A.png",
        "/images/timo/grade1/final1/q7_B.png",
        "/images/timo/grade1/final1/q7_C.png",
        "/images/timo/grade1/final1/q7_D.png"
      ]
    },
    {
      "id": 8,
      "category": "Logical thinking",
      "questionEn": "B is a 1-digit number. What is the value of B if the equation below is correct?",
      "questionVn": "1-digit number: Số có 1 chữ số; Value: Giá trị; Equation: Phép tính. 5 2 B = 4 3",
      "imageUrl": "/images/timo/grade1/final1/q8.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final1/q8_A.png",
        "/images/timo/grade1/final1/q8_B.png",
        "/images/timo/grade1/final1/q8_C.png",
        "/images/timo/grade1/final1/q8_D.png"
      ]
    },
    {
      "id": 9,
      "category": "Logical thinking",
      "questionEn": "Find the value of 4 + 4 + 4 + 4 + 4 + 4 – 6 – 6 – 6.",
      "questionVn": "Value: Giá trị.",
      "imageUrl": "/images/timo/grade1/final1/q9.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final1/q9_A.png",
        "/images/timo/grade1/final1/q9_B.png",
        "/images/timo/grade1/final1/q9_C.png",
        "/images/timo/grade1/final1/q9_D.png"
      ]
    },
    {
      "id": 10,
      "category": "Logical thinking",
      "questionEn": "Find the value of 14 – 26 + 38.",
      "questionVn": "Value: Giá trị. Number Theory / Lý thuyết số",
      "imageUrl": "/images/timo/grade1/final1/q10.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final1/q10_A.png",
        "/images/timo/grade1/final1/q10_B.png",
        "/images/timo/grade1/final1/q10_C.png",
        "/images/timo/grade1/final1/q10_D.png"
      ]
    },
    {
      "id": 11,
      "category": "Logical thinking",
      "questionEn": "A large package contains 8 eggs. A small package contains 3 eggs. Buying both large package and small package will attach 1 extra egg every time. If Mary buys 3 large and 5 small packages, how many egg(s) does she have?",
      "questionVn": "Contain: Chứa Both Tất cả Attach 1 extra egg Tặng kèm 1 quả trứng.",
      "imageUrl": "/images/timo/grade1/final1/q11.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final1/q11_A.png",
        "/images/timo/grade1/final1/q11_B.png",
        "/images/timo/grade1/final1/q11_C.png",
        "/images/timo/grade1/final1/q11_D.png"
      ]
    },
    {
      "id": 12,
      "category": "Logical thinking",
      "questionEn": "The numbers below follow the arithmetic sequence, what is the 11th number?",
      "questionVn": "Arithmetic sequence: Dãy số cách đều; 11th number: Số thứ 11. 118, 113, 108, 103, 98, …",
      "imageUrl": "/images/timo/grade1/final1/q12.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final1/q12_A.png",
        "/images/timo/grade1/final1/q12_B.png",
        "/images/timo/grade1/final1/q12_C.png",
        "/images/timo/grade1/final1/q12_D.png"
      ]
    },
    {
      "id": 13,
      "category": "Logical thinking",
      "questionEn": "It is known that A is an odd number. Determine the result below is an odd or even number.",
      "questionVn": "Odd number: Số lẻ; Even number: Số chẵn Determine Xác định. (A – 2) + (A – 1) + A + (A + 1) + (A + 2)",
      "imageUrl": "/images/timo/grade1/final1/q13.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final1/q13_A.png",
        "/images/timo/grade1/final1/q13_B.png",
        "/images/timo/grade1/final1/q13_C.png",
        "/images/timo/grade1/final1/q13_D.png"
      ]
    },
    {
      "id": 14,
      "category": "Logical thinking",
      "questionEn": "Stephen has 24 apples and Charlie has 6 apples. How many apples does Stephen have to give Charlie to make them have the same number of apples?",
      "questionVn": "The same number of apples: Số quả táo bằng nhau.",
      "imageUrl": "/images/timo/grade1/final1/q14.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final1/q14_A.png",
        "/images/timo/grade1/final1/q14_B.png",
        "/images/timo/grade1/final1/q14_C.png",
        "/images/timo/grade1/final1/q14_D.png"
      ]
    },
    {
      "id": 15,
      "category": "Logical thinking",
      "questionEn": "By observing the numbers, which even number is the greatest?",
      "questionVn": "Even number: Số chẵn; Greatest: Lớn nhất. 99 – 11, 99 + 2, 99 – 13, 99 + 4, 99 + 15, 99 + 16 Geometry / Hình học 16. How many cubes are there in figure 2 given that figure 2 is formed by some shapes as figure 1? Formed Được ghép bởi; Cube: Hình lập phương Figure Hình vẽ. 48 6 11 29 12 14        37 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com",
      "imageUrl": "/images/timo/grade1/final1/q15.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final1/q15_A.png",
        "/images/timo/grade1/final1/q15_B.png",
        "/images/timo/grade1/final1/q15_C.png",
        "/images/timo/grade1/final1/q15_D.png"
      ]
    },
    {
      "id": 17,
      "category": "Logical thinking",
      "questionEn": "How many triangle(s) is / are there in the figure below?",
      "questionVn": "Triangles Hình tam giác Figure Hình vẽ.",
      "imageUrl": "/images/timo/grade1/final1/q17.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final1/q17_A.png",
        "/images/timo/grade1/final1/q17_B.png",
        "/images/timo/grade1/final1/q17_C.png",
        "/images/timo/grade1/final1/q17_D.png"
      ]
    },
    {
      "id": 18,
      "category": "Logical thinking",
      "questionEn": "How many side(s) is / are there in the polygon below?",
      "questionVn": "Side: Cạnh Polygon Hình đa giác.",
      "imageUrl": "/images/timo/grade1/final1/q18.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final1/q18_A.png",
        "/images/timo/grade1/final1/q18_B.png",
        "/images/timo/grade1/final1/q18_C.png",
        "/images/timo/grade1/final1/q18_D.png"
      ]
    },
    {
      "id": 19,
      "category": "Logical thinking",
      "questionEn": "According to the pattern below, what is the figure in the space (‚___‛)?",
      "questionVn": "Pattern: Quy luật Figure Hình vẽ Space Chỗ trống. □ ○ ○ △ □ ○ ○ △ □ ○ ___ △ …",
      "imageUrl": "/images/timo/grade1/final1/q19.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final1/q19_A.png",
        "/images/timo/grade1/final1/q19_B.png",
        "/images/timo/grade1/final1/q19_C.png",
        "/images/timo/grade1/final1/q19_D.png"
      ]
    },
    {
      "id": 20,
      "category": "Logical thinking",
      "questionEn": "How many line segment(s) is / are there in the figure below?",
      "questionVn": "ine segments Đoạn thẳng; Figure Hình vẽ. Combinatorics / Tổ hợp",
      "imageUrl": "/images/timo/grade1/final1/q20.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final1/q20_A.png",
        "/images/timo/grade1/final1/q20_B.png",
        "/images/timo/grade1/final1/q20_C.png",
        "/images/timo/grade1/final1/q20_D.png"
      ]
    },
    {
      "id": 21,
      "category": "Logical thinking",
      "questionEn": "According to the following answers, how many 2-digit numbers are there?",
      "questionVn": "Answers: Kết quả phép tính; 2-digit numbers: Số có 2 chữ số. 21 – 6, 6 + 5, 9 – 2, 100 – 5, 11 + 5, 4 + 7",
      "imageUrl": "/images/timo/grade1/final1/q21.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final1/q21_A.png",
        "/images/timo/grade1/final1/q21_B.png",
        "/images/timo/grade1/final1/q21_C.png",
        "/images/timo/grade1/final1/q21_D.png"
      ]
    },
    {
      "id": 22,
      "category": "Logical thinking",
      "questionEn": "Which number below is the smallest?",
      "questionVn": "Smallest: Nhỏ nhất. 20111111, 2011211, 2022222, 203333  38 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com",
      "imageUrl": "/images/timo/grade1/final1/q22.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final1/q22_A.png",
        "/images/timo/grade1/final1/q22_B.png",
        "/images/timo/grade1/final1/q22_C.png",
        "/images/timo/grade1/final1/q22_D.png"
      ]
    },
    {
      "id": 23,
      "category": "Logical thinking",
      "questionEn": "According to the following answers, how many number(s) is/are between 10 and 30?",
      "questionVn": "Answers: Kết quả phép tính; Between: Ở giữa. 11 + 8, 2 + 9, 3 + 4, 50 – 7, 40 – 7, 25 + 4, 30 – 21",
      "imageUrl": "/images/timo/grade1/final1/q23.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final1/q23_A.png",
        "/images/timo/grade1/final1/q23_B.png",
        "/images/timo/grade1/final1/q23_C.png",
        "/images/timo/grade1/final1/q23_D.png"
      ]
    },
    {
      "id": 24,
      "category": "Logical thinking",
      "questionEn": "What is the smallest 3-digit even number by choosing 3 digits from 0, 1, 5, 7 and 9? (Each digit can only be used once).",
      "questionVn": "Smallest 3-digit even number: Số chẵn nhỏ nhất có 3 chữ số Digit chữ số Once Một lần.",
      "imageUrl": "/images/timo/grade1/final1/q24.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final1/q24_A.png",
        "/images/timo/grade1/final1/q24_B.png",
        "/images/timo/grade1/final1/q24_C.png",
        "/images/timo/grade1/final1/q24_D.png"
      ]
    },
    {
      "id": 25,
      "category": "Logical thinking",
      "questionEn": "Choose 4 digits, without repetition, from 2, 3, 5, 7, 8 and 9 to form two 2-digit odd numbers and add them up. What is the maximum value of the sum?",
      "questionVn": "Digits: Chữ số; Without repetition: Không lặp lại; Two 2-digit odd numbers: Hai số lẻ có 2 chữ số; Add up: Cộng vào; Maximum value: Giá trị lớn nhất; Sum: Tổng.   39 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com",
      "imageUrl": "/images/timo/grade1/final1/q25.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final1/q25_A.png",
        "/images/timo/grade1/final1/q25_B.png",
        "/images/timo/grade1/final1/q25_C.png",
        "/images/timo/grade1/final1/q25_D.png"
      ]
    }
  ],
  [
    {
      "id": 1,
      "category": "Logical thinking",
      "questionEn": "9 years ago, Peter was 24 years old. How old is he now?",
      "questionVn": "Ago Trước đây Now Hiện tại.",
      "imageUrl": "/images/timo/grade1/final2/q1.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final2/q1_A.png",
        "/images/timo/grade1/final2/q1_B.png",
        "/images/timo/grade1/final2/q1_C.png",
        "/images/timo/grade1/final2/q1_D.png"
      ]
    },
    {
      "id": 2,
      "category": "Logical thinking",
      "questionEn": "According to the pattern shown below, what is the English letter in the space (‚__‛) provided?",
      "questionVn": "Pattern Quy luật English letter Chữ cái Tiếng Anh Space Chỗ trống. F, H, J, L, N,__, …",
      "imageUrl": "/images/timo/grade1/final2/q2.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final2/q2_A.png",
        "/images/timo/grade1/final2/q2_B.png",
        "/images/timo/grade1/final2/q2_C.png",
        "/images/timo/grade1/final2/q2_D.png"
      ]
    },
    {
      "id": 3,
      "category": "Logical thinking",
      "questionEn": "If yesterday was Friday, which day of the week will 10 days later be?",
      "questionVn": "Yesterday Hôm qua Friday Thứ Sáu Day of the week Thứ  ater Sau.",
      "imageUrl": "/images/timo/grade1/final2/q3.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final2/q3_A.png",
        "/images/timo/grade1/final2/q3_B.png",
        "/images/timo/grade1/final2/q3_C.png",
        "/images/timo/grade1/final2/q3_D.png"
      ]
    },
    {
      "id": 4,
      "category": "Logical thinking",
      "questionEn": "According to the pattern below, what is the number in the space (‚__‛)?",
      "questionVn": "Pattern Quy luật Space Chỗ trống. 13, 17, 21, 25, 29, __, …",
      "imageUrl": "/images/timo/grade1/final2/q4.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final2/q4_A.png",
        "/images/timo/grade1/final2/q4_B.png",
        "/images/timo/grade1/final2/q4_C.png",
        "/images/timo/grade1/final2/q4_D.png"
      ]
    },
    {
      "id": 5,
      "category": "Logical thinking",
      "questionEn": "According to the pattern below, how many # are there in the 6th Group?",
      "questionVn": "Pattern: Quy luật 6th Group Nhóm thứ 6. Arithmetic / Số học",
      "imageUrl": "/images/timo/grade1/final2/q5.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final2/q5_A.png",
        "/images/timo/grade1/final2/q5_B.png",
        "/images/timo/grade1/final2/q5_C.png",
        "/images/timo/grade1/final2/q5_D.png"
      ]
    },
    {
      "id": 6,
      "category": "Logical thinking",
      "questionEn": "What is the number should be in the blank if the equation is correct?",
      "questionVn": "Blank Chỗ trống Equation Phép tính Correct Đúng. 19 + __ = 29",
      "imageUrl": "/images/timo/grade1/final2/q6.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final2/q6_A.png",
        "/images/timo/grade1/final2/q6_B.png",
        "/images/timo/grade1/final2/q6_C.png",
        "/images/timo/grade1/final2/q6_D.png"
      ]
    },
    {
      "id": 7,
      "category": "Logical thinking",
      "questionEn": "Find the value of 11 +3 + 26 +19 + 4 + 27.",
      "questionVn": "Value Giá trị.   40 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com",
      "imageUrl": "/images/timo/grade1/final2/q7.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final2/q7_A.png",
        "/images/timo/grade1/final2/q7_B.png",
        "/images/timo/grade1/final2/q7_C.png",
        "/images/timo/grade1/final2/q7_D.png"
      ]
    },
    {
      "id": 8,
      "category": "Logical thinking",
      "questionEn": "If A represents the same 1-digit number, what is the value of A if the equation is correct?",
      "questionVn": "Represent: Biểu diễn; 1-digit number: Số có 1 chữ số; Equation: Phép tính.",
      "imageUrl": "/images/timo/grade1/final2/q8.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final2/q8_A.png",
        "/images/timo/grade1/final2/q8_B.png",
        "/images/timo/grade1/final2/q8_C.png",
        "/images/timo/grade1/final2/q8_D.png"
      ]
    },
    {
      "id": 9,
      "category": "Logical thinking",
      "questionEn": "Find the value of 36 – 9 + 4.",
      "questionVn": "Value Giá trị.",
      "imageUrl": "/images/timo/grade1/final2/q9.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final2/q9_A.png",
        "/images/timo/grade1/final2/q9_B.png",
        "/images/timo/grade1/final2/q9_C.png",
        "/images/timo/grade1/final2/q9_D.png"
      ]
    },
    {
      "id": 10,
      "category": "Logical thinking",
      "questionEn": "Find the value of 1 – 2 + 3 – 4 + 5 – 6 + 7.",
      "questionVn": "Value: Giá trị. Number Theory / Lý thuyết số",
      "imageUrl": "/images/timo/grade1/final2/q10.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final2/q10_A.png",
        "/images/timo/grade1/final2/q10_B.png",
        "/images/timo/grade1/final2/q10_C.png",
        "/images/timo/grade1/final2/q10_D.png"
      ]
    },
    {
      "id": 11,
      "category": "Logical thinking",
      "questionEn": "By observing the numbers, which even number is the smallest?",
      "questionVn": "Even number Số chẵn Smallest Nhỏ nhất. 38, 13, 57, 15, 25, 96, 16",
      "imageUrl": "/images/timo/grade1/final2/q11.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final2/q11_A.png",
        "/images/timo/grade1/final2/q11_B.png",
        "/images/timo/grade1/final2/q11_C.png",
        "/images/timo/grade1/final2/q11_D.png"
      ]
    },
    {
      "id": 12,
      "category": "Logical thinking",
      "questionEn": "A is an odd number. Determine that 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + A is odd or even number.",
      "questionVn": "Odd number Số lẻ Determine Xác định Odd  ẻ Even Chẵn.",
      "imageUrl": "/images/timo/grade1/final2/q12.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final2/q12_A.png",
        "/images/timo/grade1/final2/q12_B.png",
        "/images/timo/grade1/final2/q12_C.png",
        "/images/timo/grade1/final2/q12_D.png"
      ]
    },
    {
      "id": 13,
      "category": "Logical thinking",
      "questionEn": "Fill the lines with ‚ + ‛ and ‚ – ‛ to make the equation below correct. (Write down the complete equation on the answer sheet).",
      "questionVn": "ine Dòng kẻ Equation Phép tính  ưu  viết toàn bộ phép tính vào phiếu trả lời. 9   4   5   3 = 7",
      "imageUrl": "/images/timo/grade1/final2/q13.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final2/q13_A.png",
        "/images/timo/grade1/final2/q13_B.png",
        "/images/timo/grade1/final2/q13_C.png",
        "/images/timo/grade1/final2/q13_D.png"
      ]
    },
    {
      "id": 14,
      "category": "Logical thinking",
      "questionEn": "Amy has 19 bananas and Bruce has 9 bananas. Amy gives Bruce some bananas. How many banana(s) does Amy have to give Bruce to make them to have the same number of bananas?",
      "questionVn": "The same number of bananas Số quả chuối bằng nhau.",
      "imageUrl": "/images/timo/grade1/final2/q14.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final2/q14_A.png",
        "/images/timo/grade1/final2/q14_B.png",
        "/images/timo/grade1/final2/q14_C.png",
        "/images/timo/grade1/final2/q14_D.png"
      ]
    },
    {
      "id": 15,
      "category": "Logical thinking",
      "questionEn": "The numbers below follow the arithmetic sequence, what is the 7th number of the sequence?",
      "questionVn": "Arithmetic sequence Dãy số cách đều 7th number Số thứ 7 Sequence Dãy số. 95, 84, 73, 62, 51, … Geometry / Hình học",
      "imageUrl": "/images/timo/grade1/final2/q15.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final2/q15_A.png",
        "/images/timo/grade1/final2/q15_B.png",
        "/images/timo/grade1/final2/q15_C.png",
        "/images/timo/grade1/final2/q15_D.png"
      ]
    },
    {
      "id": 16,
      "category": "Logical thinking",
      "questionEn": "How many square(s) is / are there in the figure below?",
      "questionVn": "Square Hình vuông Figure Hình vẽ.  41 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com",
      "imageUrl": "/images/timo/grade1/final2/q16.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final2/q16_A.png",
        "/images/timo/grade1/final2/q16_B.png",
        "/images/timo/grade1/final2/q16_C.png",
        "/images/timo/grade1/final2/q16_D.png"
      ]
    },
    {
      "id": 17,
      "category": "Logical thinking",
      "questionEn": "How many side(s) is / are there in the polygon below?",
      "questionVn": "Side Cạnh Polygon Đa giác.",
      "imageUrl": "/images/timo/grade1/final2/q17.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final2/q17_A.png",
        "/images/timo/grade1/final2/q17_B.png",
        "/images/timo/grade1/final2/q17_C.png",
        "/images/timo/grade1/final2/q17_D.png"
      ]
    },
    {
      "id": 18,
      "category": "Logical thinking",
      "questionEn": "It is known that figure 1 is formed by 6 cubes. How many cube(s) is / are there in figure 2 given that figure 2 is formed by some shapes as figure 1?",
      "questionVn": "Figure Hình vẽ Formed Được ghép bởi Cube Hình lập phương.",
      "imageUrl": "/images/timo/grade1/final2/q18.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final2/q18_A.png",
        "/images/timo/grade1/final2/q18_B.png",
        "/images/timo/grade1/final2/q18_C.png",
        "/images/timo/grade1/final2/q18_D.png"
      ]
    },
    {
      "id": 19,
      "category": "Logical thinking",
      "questionEn": "How many line segment(s) is / are there in the figure below?",
      "questionVn": "ine segment Đoạn thẳng Figure Hình vẽ.",
      "imageUrl": "/images/timo/grade1/final2/q19.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final2/q19_A.png",
        "/images/timo/grade1/final2/q19_B.png",
        "/images/timo/grade1/final2/q19_C.png",
        "/images/timo/grade1/final2/q19_D.png"
      ]
    },
    {
      "id": 20,
      "category": "Logical thinking",
      "questionEn": "How many interior angle(s) is / are there in the polygon below?",
      "questionVn": "Interior angle Góc bên trong Polygon Đa giác.    42 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com Combinatorics / Tổ hợp",
      "imageUrl": "/images/timo/grade1/final2/q20.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final2/q20_A.png",
        "/images/timo/grade1/final2/q20_B.png",
        "/images/timo/grade1/final2/q20_C.png",
        "/images/timo/grade1/final2/q20_D.png"
      ]
    },
    {
      "id": 21,
      "category": "Logical thinking",
      "questionEn": "Alice has five $5 coins. At most how many $2 coins can she exchange?",
      "questionVn": "Coin Đồng xu Maximum Nhiều nhất Exchange Đổi.",
      "imageUrl": "/images/timo/grade1/final2/q21.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final2/q21_A.png",
        "/images/timo/grade1/final2/q21_B.png",
        "/images/timo/grade1/final2/q21_C.png",
        "/images/timo/grade1/final2/q21_D.png"
      ]
    },
    {
      "id": 22,
      "category": "Logical thinking",
      "questionEn": "What is the largest 3-digit even number by choosing 3 digits from 0, 6, 1 and 5? (Each digit can only be used once).",
      "questionVn": "Largest 3-digit even number: Số chẵn lớn nhất có 3 chữ số Digit Chữ số Once Một lần.",
      "imageUrl": "/images/timo/grade1/final2/q22.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final2/q22_A.png",
        "/images/timo/grade1/final2/q22_B.png",
        "/images/timo/grade1/final2/q22_C.png",
        "/images/timo/grade1/final2/q22_D.png"
      ]
    },
    {
      "id": 23,
      "category": "Logical thinking",
      "questionEn": "Choose 4 digits, without repetition, from 1, 2, 5, 7 and 9 to form two 2-digit numbers and add them up. What is the minimum value of the sum?",
      "questionVn": "Digit Chữ số Without repetion Không lặp lại Form Ghép 2-digit numbers Số có 2 chữ số Add Cộng Minimum value Giá trị nhỏ nhất Sum Tổng.",
      "imageUrl": "/images/timo/grade1/final2/q23.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final2/q23_A.png",
        "/images/timo/grade1/final2/q23_B.png",
        "/images/timo/grade1/final2/q23_C.png",
        "/images/timo/grade1/final2/q23_D.png"
      ]
    },
    {
      "id": 24,
      "category": "Logical thinking",
      "questionEn": "Among the following answers, how many 2-digit numbers are there?",
      "questionVn": "Answer Kết quả 2-digit number Số có 2 chữ số. 9 + 12, 15 – 9, 68 + 29, 84 + 29, 5 + 4, 12 – 2",
      "imageUrl": "/images/timo/grade1/final2/q24.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final2/q24_A.png",
        "/images/timo/grade1/final2/q24_B.png",
        "/images/timo/grade1/final2/q24_C.png",
        "/images/timo/grade1/final2/q24_D.png"
      ]
    },
    {
      "id": 25,
      "category": "Logical thinking",
      "questionEn": "Which number below is the greatest?",
      "questionVn": "Greatest  ớn nhất. 20191982, 20192641, 2019845, 20099521  43 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com",
      "imageUrl": "/images/timo/grade1/final2/q25.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final2/q25_A.png",
        "/images/timo/grade1/final2/q25_B.png",
        "/images/timo/grade1/final2/q25_C.png",
        "/images/timo/grade1/final2/q25_D.png"
      ]
    }
  ],
  [
    {
      "id": 1,
      "category": "Logical thinking",
      "questionEn": "Jacob is the eldest boy in the family. He has 4 younger sisters and 3 younger brothers. How many child(ren) is / are there in Jacob’s family?",
      "questionVn": "Eldest  ớn nhất Younger sister Em gái Younger brother Em trai.",
      "imageUrl": "/images/timo/grade1/final3/q1.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final3/q1_A.png",
        "/images/timo/grade1/final3/q1_B.png",
        "/images/timo/grade1/final3/q1_C.png",
        "/images/timo/grade1/final3/q1_D.png"
      ]
    },
    {
      "id": 2,
      "category": "Logical thinking",
      "questionEn": "In year 2018, how many month(s) is / are there with exactly 30 days?",
      "questionVn": "Year Năm Month Tháng Exactly Chính xác Day Ngày.",
      "imageUrl": "/images/timo/grade1/final3/q2.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final3/q2_A.png",
        "/images/timo/grade1/final3/q2_B.png",
        "/images/timo/grade1/final3/q2_C.png",
        "/images/timo/grade1/final3/q2_D.png"
      ]
    },
    {
      "id": 3,
      "category": "Logical thinking",
      "questionEn": "4 years ago, Amy was 13 years old. How old will Amy be 3 years later?",
      "questionVn": "Ago Trước đây  ater Sau này.",
      "imageUrl": "/images/timo/grade1/final3/q3.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final3/q3_A.png",
        "/images/timo/grade1/final3/q3_B.png",
        "/images/timo/grade1/final3/q3_C.png",
        "/images/timo/grade1/final3/q3_D.png"
      ]
    },
    {
      "id": 4,
      "category": "Logical thinking",
      "questionEn": "According to the pattern shown below, what is the number in the space?",
      "questionVn": "Pattern Quy luật Space Chỗ trống. 1, 7, 13, 19, 25, __",
      "imageUrl": "/images/timo/grade1/final3/q4.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final3/q4_A.png",
        "/images/timo/grade1/final3/q4_B.png",
        "/images/timo/grade1/final3/q4_C.png",
        "/images/timo/grade1/final3/q4_D.png"
      ]
    },
    {
      "id": 5,
      "category": "Logical thinking",
      "questionEn": "According to the pattern shown below, what is the English letter in the space (‚__‛)?",
      "questionVn": "Pattern Quy luật English letter Chữ cái tiếng Anh. A, D, G, J, M, __, … Arithmetic / Số học",
      "imageUrl": "/images/timo/grade1/final3/q5.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final3/q5_A.png",
        "/images/timo/grade1/final3/q5_B.png",
        "/images/timo/grade1/final3/q5_C.png",
        "/images/timo/grade1/final3/q5_D.png"
      ]
    },
    {
      "id": 6,
      "category": "Logical thinking",
      "questionEn": "Find the value of 2 + 3 + 5 + 6 + 8 + 9.",
      "questionVn": "Value Giá trị.",
      "imageUrl": "/images/timo/grade1/final3/q6.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final3/q6_A.png",
        "/images/timo/grade1/final3/q6_B.png",
        "/images/timo/grade1/final3/q6_C.png",
        "/images/timo/grade1/final3/q6_D.png"
      ]
    },
    {
      "id": 7,
      "category": "Logical thinking",
      "questionEn": "Find the value of 27 + 18 – 17.",
      "questionVn": "Value Giá trị.",
      "imageUrl": "/images/timo/grade1/final3/q7.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final3/q7_A.png",
        "/images/timo/grade1/final3/q7_B.png",
        "/images/timo/grade1/final3/q7_C.png",
        "/images/timo/grade1/final3/q7_D.png"
      ]
    },
    {
      "id": 8,
      "category": "Logical thinking",
      "questionEn": "A is a 1-digit number. What is the value of A if the equation below is correct?",
      "questionVn": "1-digit number Số có 1 chữ số Value Giá trị Equation Phép tính.",
      "imageUrl": "/images/timo/grade1/final3/q8.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final3/q8_A.png",
        "/images/timo/grade1/final3/q8_B.png",
        "/images/timo/grade1/final3/q8_C.png",
        "/images/timo/grade1/final3/q8_D.png"
      ]
    },
    {
      "id": 9,
      "category": "Logical thinking",
      "questionEn": "What is the number in the blank if the equation below is correct?",
      "questionVn": "Blank Chỗ trống Equation Phép tính Correct Đúng. 35 + __ = 42",
      "imageUrl": "/images/timo/grade1/final3/q9.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final3/q9_A.png",
        "/images/timo/grade1/final3/q9_B.png",
        "/images/timo/grade1/final3/q9_C.png",
        "/images/timo/grade1/final3/q9_D.png"
      ]
    },
    {
      "id": 10,
      "category": "Logical thinking",
      "questionEn": "If B represents the same 1-digit number, what is the value of B if the equation on the right is correct?",
      "questionVn": "Represent Biểu diễn 1-digit number Số có 1 chữ số Value Giá trị Equation Phép tính Correct Đúng. 3 3 3 3 3 3 A    44 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com Number Theory / Lý thuyết số",
      "imageUrl": "/images/timo/grade1/final3/q10.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final3/q10_A.png",
        "/images/timo/grade1/final3/q10_B.png",
        "/images/timo/grade1/final3/q10_C.png",
        "/images/timo/grade1/final3/q10_D.png"
      ]
    },
    {
      "id": 11,
      "category": "Logical thinking",
      "questionEn": "Fill the lines with ‚ + ‛ and ‚ – ‛ to make the equation below correct. (Write down the complete equation on the answer sheet).",
      "questionVn": "ine Dòng kẻ Equation Phép tính  ưu  viết toàn bộ phép tính vào phiếu trả lời. 1   8   5   4 = 8",
      "imageUrl": "/images/timo/grade1/final3/q11.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final3/q11_A.png",
        "/images/timo/grade1/final3/q11_B.png",
        "/images/timo/grade1/final3/q11_C.png",
        "/images/timo/grade1/final3/q11_D.png"
      ]
    },
    {
      "id": 12,
      "category": "Logical thinking",
      "questionEn": "Fill the lines with ‚ + ‛ and ‚ – ‛ to make the equation below correct. (Write down the complete equation on the answer sheet).",
      "questionVn": "ine Dòng kẻ Equation Phép tính  ưu  viết toàn bộ phép tính vào phiếu trả lời. 1   4   5   7 = 7",
      "imageUrl": "/images/timo/grade1/final3/q12.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final3/q12_A.png",
        "/images/timo/grade1/final3/q12_B.png",
        "/images/timo/grade1/final3/q12_C.png",
        "/images/timo/grade1/final3/q12_D.png"
      ]
    },
    {
      "id": 13,
      "category": "Logical thinking",
      "questionEn": "Four students have 16 balloons in total and each of them have a different number of balloons. Know that Andy has the most balloons. At most how many balloon(s) does Andy have?",
      "questionVn": "Balloon: Bóng bay In total Tổng cộng Different Khác nhau Most Nhiều nhất.",
      "imageUrl": "/images/timo/grade1/final3/q13.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final3/q13_A.png",
        "/images/timo/grade1/final3/q13_B.png",
        "/images/timo/grade1/final3/q13_C.png",
        "/images/timo/grade1/final3/q13_D.png"
      ]
    },
    {
      "id": 14,
      "category": "Logical thinking",
      "questionEn": "Determine the result of 2 + 5 + 8 + 11 + 14 + 17 + 20 + 232 is odd or even.",
      "questionVn": "Determine Xác định Result Kết quả Odd  ẻ Even Chẵn.",
      "imageUrl": "/images/timo/grade1/final3/q14.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final3/q14_A.png",
        "/images/timo/grade1/final3/q14_B.png",
        "/images/timo/grade1/final3/q14_C.png",
        "/images/timo/grade1/final3/q14_D.png"
      ]
    },
    {
      "id": 15,
      "category": "Logical thinking",
      "questionEn": "How many two-digit number(s) that have the unit digit 6 is / are there?",
      "questionVn": "Two-digit number Số có hai chữ số Unit digit Chữ số hàng đơn vị. Geometry / Hình học",
      "imageUrl": "/images/timo/grade1/final3/q15.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final3/q15_A.png",
        "/images/timo/grade1/final3/q15_B.png",
        "/images/timo/grade1/final3/q15_C.png",
        "/images/timo/grade1/final3/q15_D.png"
      ]
    },
    {
      "id": 16,
      "category": "Logical thinking",
      "questionEn": "How many square(s) is / are there in the figure below?",
      "questionVn": "Square Hình vuông Figure Hình vẽ.",
      "imageUrl": "/images/timo/grade1/final3/q16.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final3/q16_A.png",
        "/images/timo/grade1/final3/q16_B.png",
        "/images/timo/grade1/final3/q16_C.png",
        "/images/timo/grade1/final3/q16_D.png"
      ]
    },
    {
      "id": 17,
      "category": "Logical thinking",
      "questionEn": "At least how many cube(s) is / are there in the figure below?",
      "questionVn": "At least  t nhất Cube Hình lập phương Figure Hình vẽ.    45 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com",
      "imageUrl": "/images/timo/grade1/final3/q17.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final3/q17_A.png",
        "/images/timo/grade1/final3/q17_B.png",
        "/images/timo/grade1/final3/q17_C.png",
        "/images/timo/grade1/final3/q17_D.png"
      ]
    },
    {
      "id": 18,
      "category": "Logical thinking",
      "questionEn": "How many triangle(s) is / are there in the figure below?",
      "questionVn": "Triangle Hình tam giác Figure Hình vẽ.",
      "imageUrl": "/images/timo/grade1/final3/q18.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final3/q18_A.png",
        "/images/timo/grade1/final3/q18_B.png",
        "/images/timo/grade1/final3/q18_C.png",
        "/images/timo/grade1/final3/q18_D.png"
      ]
    },
    {
      "id": 19,
      "category": "Logical thinking",
      "questionEn": "According to the pattern below, what is the figure in the space (‚__‛)?",
      "questionVn": "Pattern Quy luật Figure Hình vẽ Space Chỗ trống. △ ○ □ △ ○ □ △ ○ □ △ __ □ …",
      "imageUrl": "/images/timo/grade1/final3/q19.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final3/q19_A.png",
        "/images/timo/grade1/final3/q19_B.png",
        "/images/timo/grade1/final3/q19_C.png",
        "/images/timo/grade1/final3/q19_D.png"
      ]
    },
    {
      "id": 20,
      "category": "Logical thinking",
      "questionEn": "According to the pattern below, how many  are there in the 13th Group?",
      "questionVn": "Pattern Quy luật 13th Group Nhóm thứ 13. Combinatorics / Tổ hợp",
      "imageUrl": "/images/timo/grade1/final3/q20.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final3/q20_A.png",
        "/images/timo/grade1/final3/q20_B.png",
        "/images/timo/grade1/final3/q20_C.png",
        "/images/timo/grade1/final3/q20_D.png"
      ]
    },
    {
      "id": 21,
      "category": "Logical thinking",
      "questionEn": "Separate 10 as the sum of two 1-digit numbers. How many way(s) is / are there? (Consider 5 + 6 and 6 + 5 as the same method).",
      "questionVn": "Separate Chia Sum Tổng 1-digit numbers Số có 1 chữ số The same method C ng một cách.",
      "imageUrl": "/images/timo/grade1/final3/q21.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final3/q21_A.png",
        "/images/timo/grade1/final3/q21_B.png",
        "/images/timo/grade1/final3/q21_C.png",
        "/images/timo/grade1/final3/q21_D.png"
      ]
    },
    {
      "id": 22,
      "category": "Logical thinking",
      "questionEn": "Among the following answers, how many odd number(s) is / are there?",
      "questionVn": "Answer Kết quả Odd number Số lẻ. 1 + 3, 2 + 4, 3 + 5, 8 + 4, 2 + 5, 2 + 4",
      "imageUrl": "/images/timo/grade1/final3/q22.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final3/q22_A.png",
        "/images/timo/grade1/final3/q22_B.png",
        "/images/timo/grade1/final3/q22_C.png",
        "/images/timo/grade1/final3/q22_D.png"
      ]
    },
    {
      "id": 23,
      "category": "Logical thinking",
      "questionEn": "Choose 4 digits, without repetition, from 1, 3, 4 and 7 to form two 2-digit numbers and add them up. What is the minimum value of the sum?",
      "questionVn": "Digit Chữ số Without repetition Không lặp lại Form Ghép 2-digit numbers: Số có 2 chữ số Add Cộng Minimum value Giá trị nhỏ nhất.",
      "imageUrl": "/images/timo/grade1/final3/q23.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final3/q23_A.png",
        "/images/timo/grade1/final3/q23_B.png",
        "/images/timo/grade1/final3/q23_C.png",
        "/images/timo/grade1/final3/q23_D.png"
      ]
    },
    {
      "id": 24,
      "category": "Logical thinking",
      "questionEn": "Calculate the sum of the greatest 1-digit even number and the smallest 2-digit odd number.",
      "questionVn": "Calculate Tính Sum Tổng Greatest 1-digit even number Số chẵn lớn nhất có 1 chữ số Smallest 2-digit odd number Số lẻ nhỏ nhất có 2 chữ số.",
      "imageUrl": "/images/timo/grade1/final3/q24.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final3/q24_A.png",
        "/images/timo/grade1/final3/q24_B.png",
        "/images/timo/grade1/final3/q24_C.png",
        "/images/timo/grade1/final3/q24_D.png"
      ]
    },
    {
      "id": 25,
      "category": "Logical thinking",
      "questionEn": "Peter has 12 $1 coins. How many $2 coin(s) can he exchange?",
      "questionVn": "Coin Đồng xu Exchange Đổi.  46 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com",
      "imageUrl": "/images/timo/grade1/final3/q25.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final3/q25_A.png",
        "/images/timo/grade1/final3/q25_B.png",
        "/images/timo/grade1/final3/q25_C.png",
        "/images/timo/grade1/final3/q25_D.png"
      ]
    }
  ],
  [
    {
      "id": 1,
      "category": "Logical thinking",
      "questionEn": "Amy’s father has five children. Two of them are sons. How many sister(s) does Amy have given that Amy is a girl?",
      "questionVn": "Son Con trai Sister Chị, em gái.",
      "imageUrl": "/images/timo/grade1/final4/q1.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final4/q1_A.png",
        "/images/timo/grade1/final4/q1_B.png",
        "/images/timo/grade1/final4/q1_C.png",
        "/images/timo/grade1/final4/q1_D.png"
      ]
    },
    {
      "id": 2,
      "category": "Logical thinking",
      "questionEn": "What is the greatest possible number of consecutive day(s) that has exactly one Sunday?",
      "questionVn": "Greatest possible number Số lớn nhất có thể Consecutive  iên tiếp Exactly Chính xác Sunday Chủ Nhật",
      "imageUrl": "/images/timo/grade1/final4/q2.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final4/q2_A.png",
        "/images/timo/grade1/final4/q2_B.png",
        "/images/timo/grade1/final4/q2_C.png",
        "/images/timo/grade1/final4/q2_D.png"
      ]
    },
    {
      "id": 3,
      "category": "Logical thinking",
      "questionEn": "5 years later, Amy will be 13 years old. How old was Amy 4 years ago?",
      "questionVn": "ater Sau Ago Trước đây.",
      "imageUrl": "/images/timo/grade1/final4/q3.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final4/q3_A.png",
        "/images/timo/grade1/final4/q3_B.png",
        "/images/timo/grade1/final4/q3_C.png",
        "/images/timo/grade1/final4/q3_D.png"
      ]
    },
    {
      "id": 4,
      "category": "Logical thinking",
      "questionEn": "According to the pattern shown below, what is the number in the blank (‚__‛)?",
      "questionVn": "Pattern Quy luật Blank Chỗ trống. 1, 5, 9, 13, 17, 21,__, …",
      "imageUrl": "/images/timo/grade1/final4/q4.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final4/q4_A.png",
        "/images/timo/grade1/final4/q4_B.png",
        "/images/timo/grade1/final4/q4_C.png",
        "/images/timo/grade1/final4/q4_D.png"
      ]
    },
    {
      "id": 5,
      "category": "Logical thinking",
      "questionEn": "According to the pattern below, how many  are there in the 17th Group?",
      "questionVn": "Pattern Quy luật 17th group Nhóm thứ 17. Arithmetic / Số học",
      "imageUrl": "/images/timo/grade1/final4/q5.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final4/q5_A.png",
        "/images/timo/grade1/final4/q5_B.png",
        "/images/timo/grade1/final4/q5_C.png",
        "/images/timo/grade1/final4/q5_D.png"
      ]
    },
    {
      "id": 6,
      "category": "Logical thinking",
      "questionEn": "Find the value of 1 + 2 + 4 + 5 + 6 + 7 + 9 + 10.",
      "questionVn": "Value Giá trị.",
      "imageUrl": "/images/timo/grade1/final4/q6.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final4/q6_A.png",
        "/images/timo/grade1/final4/q6_B.png",
        "/images/timo/grade1/final4/q6_C.png",
        "/images/timo/grade1/final4/q6_D.png"
      ]
    },
    {
      "id": 7,
      "category": "Logical thinking",
      "questionEn": "Find the value of 26 + 19 – 6.",
      "questionVn": "Value Giá trị.",
      "imageUrl": "/images/timo/grade1/final4/q7.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final4/q7_A.png",
        "/images/timo/grade1/final4/q7_B.png",
        "/images/timo/grade1/final4/q7_C.png",
        "/images/timo/grade1/final4/q7_D.png"
      ]
    },
    {
      "id": 8,
      "category": "Logical thinking",
      "questionEn": "A is a 1-digit number. What is the value of A if the equation below is correct?",
      "questionVn": "1-digit number Số có 1 chữ số Value Giá trị Equation Phép tính. 2 A = 16   47 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com",
      "imageUrl": "/images/timo/grade1/final4/q8.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final4/q8_A.png",
        "/images/timo/grade1/final4/q8_B.png",
        "/images/timo/grade1/final4/q8_C.png",
        "/images/timo/grade1/final4/q8_D.png"
      ]
    },
    {
      "id": 9,
      "category": "Logical thinking",
      "questionEn": "What is the number in the blank if the equation below is correct?",
      "questionVn": "Blank Chỗ trống Equation Phép tính Correct Đúng. 72 - __ = 65",
      "imageUrl": "/images/timo/grade1/final4/q9.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final4/q9_A.png",
        "/images/timo/grade1/final4/q9_B.png",
        "/images/timo/grade1/final4/q9_C.png",
        "/images/timo/grade1/final4/q9_D.png"
      ]
    },
    {
      "id": 10,
      "category": "Logical thinking",
      "questionEn": "B is a 1-digit number. What is the value of B if the equation below is correct?",
      "questionVn": "1-digit number Số có 1 chữ số Value Giá trị Equation Phép tính. 10 – B = B Number Theory / Lý thuyết số",
      "imageUrl": "/images/timo/grade1/final4/q10.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final4/q10_A.png",
        "/images/timo/grade1/final4/q10_B.png",
        "/images/timo/grade1/final4/q10_C.png",
        "/images/timo/grade1/final4/q10_D.png"
      ]
    },
    {
      "id": 11,
      "category": "Logical thinking",
      "questionEn": "Amy has 18 apples and John has 4 apples. How many apple(s) does Amy have to give John to make them to have the same number of apples?",
      "questionVn": "The same number of apples Số táo bằng nhau.",
      "imageUrl": "/images/timo/grade1/final4/q11.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final4/q11_A.png",
        "/images/timo/grade1/final4/q11_B.png",
        "/images/timo/grade1/final4/q11_C.png",
        "/images/timo/grade1/final4/q11_D.png"
      ]
    },
    {
      "id": 12,
      "category": "Logical thinking",
      "questionEn": "Fill the lines with ‚ + ‛ and ‚ – ‛ to make the equation below correct. (Write down the complete equation in the answer sheet).",
      "questionVn": "ine Dòng kẻ Equation Phép tính  ưu  viết toàn bộ phép tính vào phiếu trả lời. 1   3   5   7 = 2",
      "imageUrl": "/images/timo/grade1/final4/q12.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final4/q12_A.png",
        "/images/timo/grade1/final4/q12_B.png",
        "/images/timo/grade1/final4/q12_C.png",
        "/images/timo/grade1/final4/q12_D.png"
      ]
    },
    {
      "id": 13,
      "category": "Logical thinking",
      "questionEn": "3 students have 17 balloons in total and each of them has a different number of balloons. Anna has the most balloons. At least how many balloon(s) does she have?",
      "questionVn": "Balloon Quả bóng bay In total Tổng cộng Different Khác nhau Most Nhiều nhất At least  t nhất.",
      "imageUrl": "/images/timo/grade1/final4/q13.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final4/q13_A.png",
        "/images/timo/grade1/final4/q13_B.png",
        "/images/timo/grade1/final4/q13_C.png",
        "/images/timo/grade1/final4/q13_D.png"
      ]
    },
    {
      "id": 14,
      "category": "Logical thinking",
      "questionEn": "How many two-digit number(s) that have the unit digit 5 is / are there?",
      "questionVn": "Two-digit number Số có hai chữ số Unit digit 5 Chữ số hàng đơn vị là 5.",
      "imageUrl": "/images/timo/grade1/final4/q14.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final4/q14_A.png",
        "/images/timo/grade1/final4/q14_B.png",
        "/images/timo/grade1/final4/q14_C.png",
        "/images/timo/grade1/final4/q14_D.png"
      ]
    },
    {
      "id": 15,
      "category": "Logical thinking",
      "questionEn": "Determine the result of 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 is odd or even.",
      "questionVn": "Determine Xác định Result Kết quả Odd  ẻ Even Chẵn. Geometry / Hình học",
      "imageUrl": "/images/timo/grade1/final4/q15.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final4/q15_A.png",
        "/images/timo/grade1/final4/q15_B.png",
        "/images/timo/grade1/final4/q15_C.png",
        "/images/timo/grade1/final4/q15_D.png"
      ]
    },
    {
      "id": 16,
      "category": "Logical thinking",
      "questionEn": "How many square(s) is / are there in the figure below?",
      "questionVn": "Square Hình vuông Figure Hình vẽ.",
      "imageUrl": "/images/timo/grade1/final4/q16.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final4/q16_A.png",
        "/images/timo/grade1/final4/q16_B.png",
        "/images/timo/grade1/final4/q16_C.png",
        "/images/timo/grade1/final4/q16_D.png"
      ]
    },
    {
      "id": 17,
      "category": "Logical thinking",
      "questionEn": "At least how many cube(s) is / are there in the figure below?",
      "questionVn": "At least  t nhất Cube Hình lập phương Figure Hình vẽ.  48 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com",
      "imageUrl": "/images/timo/grade1/final4/q17.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final4/q17_A.png",
        "/images/timo/grade1/final4/q17_B.png",
        "/images/timo/grade1/final4/q17_C.png",
        "/images/timo/grade1/final4/q17_D.png"
      ]
    },
    {
      "id": 18,
      "category": "Logical thinking",
      "questionEn": "How many side(s) is / are there in the polygon below?",
      "questionVn": "Side Cạnh Polygon Đa giác.",
      "imageUrl": "/images/timo/grade1/final4/q18.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final4/q18_A.png",
        "/images/timo/grade1/final4/q18_B.png",
        "/images/timo/grade1/final4/q18_C.png",
        "/images/timo/grade1/final4/q18_D.png"
      ]
    },
    {
      "id": 19,
      "category": "Logical thinking",
      "questionEn": "From the pattern below, what is the figure in the space (‚__‛)?",
      "questionVn": "Pattern Quy luật Figure Hình vẽ Space Chỗ trống. ○ □ □△ ○ □ □ △○ □ __ △…",
      "imageUrl": "/images/timo/grade1/final4/q19.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final4/q19_A.png",
        "/images/timo/grade1/final4/q19_B.png",
        "/images/timo/grade1/final4/q19_C.png",
        "/images/timo/grade1/final4/q19_D.png"
      ]
    },
    {
      "id": 20,
      "category": "Logical thinking",
      "questionEn": "How many interior angle(s) is / are there in the polygon below?",
      "questionVn": "Interior angle Góc trong Polygon Đa giác.  Combinatorics / Tổ hợp",
      "imageUrl": "/images/timo/grade1/final4/q20.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final4/q20_A.png",
        "/images/timo/grade1/final4/q20_B.png",
        "/images/timo/grade1/final4/q20_C.png",
        "/images/timo/grade1/final4/q20_D.png"
      ]
    },
    {
      "id": 21,
      "category": "Logical thinking",
      "questionEn": "Separate 28 candies into two equal groups, how many candy(ies) is / are there in each group?",
      "questionVn": "Separate Chia Equal groups Các nhóm bằng nhau.",
      "imageUrl": "/images/timo/grade1/final4/q21.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final4/q21_A.png",
        "/images/timo/grade1/final4/q21_B.png",
        "/images/timo/grade1/final4/q21_C.png",
        "/images/timo/grade1/final4/q21_D.png"
      ]
    },
    {
      "id": 22,
      "category": "Logical thinking",
      "questionEn": "Choose 2 digits, without repetition, from 1, 2, 4 and 8 to form two-digit numbers. How many odd number(s) is / are there?",
      "questionVn": "Digit Chữ số Without repetition Không lặp lại Form Ghép Two-digit number Số có hai chữ số Odd number Số lẻ.",
      "imageUrl": "/images/timo/grade1/final4/q22.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final4/q22_A.png",
        "/images/timo/grade1/final4/q22_B.png",
        "/images/timo/grade1/final4/q22_C.png",
        "/images/timo/grade1/final4/q22_D.png"
      ]
    },
    {
      "id": 23,
      "category": "Logical thinking",
      "questionEn": "There are 2 ways from the market to the train station and there are 2 ways from the train station to the cinema. How many different way(s) is / are there from the market to the cinema through the train station?",
      "questionVn": "Different way s  Các đường khác nhau Through Đi qua.",
      "imageUrl": "/images/timo/grade1/final4/q23.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final4/q23_A.png",
        "/images/timo/grade1/final4/q23_B.png",
        "/images/timo/grade1/final4/q23_C.png",
        "/images/timo/grade1/final4/q23_D.png"
      ]
    },
    {
      "id": 24,
      "category": "Logical thinking",
      "questionEn": "What is the smallest 3-digit number formed by choosing 3 digits from 3, 6, 1 and 8? (Each digit can only be used once).",
      "questionVn": "49 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com Smallest 3-digit number Số nhỏ nhất có 3 chữ số Formed Được ghép bởi Digit Chữ số Once Một lần.",
      "imageUrl": "/images/timo/grade1/final4/q24.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final4/q24_A.png",
        "/images/timo/grade1/final4/q24_B.png",
        "/images/timo/grade1/final4/q24_C.png",
        "/images/timo/grade1/final4/q24_D.png"
      ]
    },
    {
      "id": 25,
      "category": "Logical thinking",
      "questionEn": "Peter has 4 $1 coins, 2 $5 coins and 1 $10 coin, what is the maximum number of the souvenir that he can buy if each souvenir costs $3?",
      "questionVn": "Coin Đồng xu Maximum number Số lượng lớn nhất Souvenir Đồ lưu niệm.  50 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com",
      "imageUrl": "/images/timo/grade1/final4/q25.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final4/q25_A.png",
        "/images/timo/grade1/final4/q25_B.png",
        "/images/timo/grade1/final4/q25_C.png",
        "/images/timo/grade1/final4/q25_D.png"
      ]
    }
  ],
  [
    {
      "id": 1,
      "category": "Logical thinking",
      "questionEn": "Mary has one brother and three sisters. How many sisters does Mary’s brother have given that Mary is a girl?",
      "questionVn": "Brother Anh, em trai Sister Chị, em gái.",
      "imageUrl": "/images/timo/grade1/final5/q1.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final5/q1_A.png",
        "/images/timo/grade1/final5/q1_B.png",
        "/images/timo/grade1/final5/q1_C.png",
        "/images/timo/grade1/final5/q1_D.png"
      ]
    },
    {
      "id": 2,
      "category": "Logical thinking",
      "questionEn": "Three friends – Amy, Benny and Winnie, have one pet each – either a cat, a dog, or a bunny. Amy does not have a cat. Benny has a bunny. What kind of pet does Winnie have?",
      "questionVn": "Kind of pet  oại vật nuôi.",
      "imageUrl": "/images/timo/grade1/final5/q2.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final5/q2_A.png",
        "/images/timo/grade1/final5/q2_B.png",
        "/images/timo/grade1/final5/q2_C.png",
        "/images/timo/grade1/final5/q2_D.png"
      ]
    },
    {
      "id": 3,
      "category": "Logical thinking",
      "questionEn": "Andy needs to cut a cake. At least how many cuts are required so that he can cut the cake into 4 parts?",
      "questionVn": "Cut Cắt, nhát cắt At least  t nhất Part Phần.",
      "imageUrl": "/images/timo/grade1/final5/q3.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final5/q3_A.png",
        "/images/timo/grade1/final5/q3_B.png",
        "/images/timo/grade1/final5/q3_C.png",
        "/images/timo/grade1/final5/q3_D.png"
      ]
    },
    {
      "id": 4,
      "category": "Logical thinking",
      "questionEn": "John wrote a 2-digit number on a paper and asked Peter to guess it. Peter asked: ‚Is the number 16?‛ John replied: ‚One digit is correct, but the position of that digit is wrong.‛ Peter asked again: ‚Is the number 67?‛ John said: ‚One digit is correct, but the position of that digit is wrong.‛ What is the number written by John?",
      "questionVn": "2-digit number Số có 2 chữ số Guess Đoán Digit Chữ số Correct Đúng Position Vị trí Wrong: Sai.",
      "imageUrl": "/images/timo/grade1/final5/q4.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final5/q4_A.png",
        "/images/timo/grade1/final5/q4_B.png",
        "/images/timo/grade1/final5/q4_C.png",
        "/images/timo/grade1/final5/q4_D.png"
      ]
    },
    {
      "id": 5,
      "category": "Logical thinking",
      "questionEn": "According to the pattern shown below, how many circles are there in the fourth group?",
      "questionVn": "Pattern: Quy luật Circle Hình tròn Fourth group Nhóm thứ tư.  Arithmetic / Số học",
      "imageUrl": "/images/timo/grade1/final5/q5.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final5/q5_A.png",
        "/images/timo/grade1/final5/q5_B.png",
        "/images/timo/grade1/final5/q5_C.png",
        "/images/timo/grade1/final5/q5_D.png"
      ]
    },
    {
      "id": 6,
      "category": "Logical thinking",
      "questionEn": "Find the value of 3 + 3 + 3 + 3 + 3 + 3 + 3 + 3 + 3 + 3.",
      "questionVn": "Value Giá trị.",
      "imageUrl": "/images/timo/grade1/final5/q6.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final5/q6_A.png",
        "/images/timo/grade1/final5/q6_B.png",
        "/images/timo/grade1/final5/q6_C.png",
        "/images/timo/grade1/final5/q6_D.png"
      ]
    },
    {
      "id": 7,
      "category": "Logical thinking",
      "questionEn": "Find the value of 82 + 19 – 42.",
      "questionVn": "Value Giá trị.",
      "imageUrl": "/images/timo/grade1/final5/q7.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final5/q7_A.png",
        "/images/timo/grade1/final5/q7_B.png",
        "/images/timo/grade1/final5/q7_C.png",
        "/images/timo/grade1/final5/q7_D.png"
      ]
    },
    {
      "id": 8,
      "category": "Logical thinking",
      "questionEn": "What is the number in the blank so that the equation below is correct?",
      "questionVn": "Blank Chỗ trống Equation Phép tính Correct Đúng. 22 + __ = 30  51 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com",
      "imageUrl": "/images/timo/grade1/final5/q8.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final5/q8_A.png",
        "/images/timo/grade1/final5/q8_B.png",
        "/images/timo/grade1/final5/q8_C.png",
        "/images/timo/grade1/final5/q8_D.png"
      ]
    },
    {
      "id": 9,
      "category": "Logical thinking",
      "questionEn": "Find the value of 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 + 11.",
      "questionVn": "Value Giá trị.",
      "imageUrl": "/images/timo/grade1/final5/q9.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final5/q9_A.png",
        "/images/timo/grade1/final5/q9_B.png",
        "/images/timo/grade1/final5/q9_C.png",
        "/images/timo/grade1/final5/q9_D.png"
      ]
    },
    {
      "id": 10,
      "category": "Logical thinking",
      "questionEn": "A and B are both 1-digit number. What is the value of A in the equation below if it is correct?",
      "questionVn": "1-digit number Số có 1 chữ số Value Giá trị Equation Phép tính. 1 8 A = B Number Theory / Lý thuyết số",
      "imageUrl": "/images/timo/grade1/final5/q10.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final5/q10_A.png",
        "/images/timo/grade1/final5/q10_B.png",
        "/images/timo/grade1/final5/q10_C.png",
        "/images/timo/grade1/final5/q10_D.png"
      ]
    },
    {
      "id": 11,
      "category": "Logical thinking",
      "questionEn": "Amy has 10 apples and John has 4 apples. How many apples does Amy have to give John to make them to have the same number of apples?",
      "questionVn": "The same number of apples Số quả táo bằng nhau.",
      "imageUrl": "/images/timo/grade1/final5/q11.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final5/q11_A.png",
        "/images/timo/grade1/final5/q11_B.png",
        "/images/timo/grade1/final5/q11_C.png",
        "/images/timo/grade1/final5/q11_D.png"
      ]
    },
    {
      "id": 12,
      "category": "Logical thinking",
      "questionEn": "Fill the lines with ‚ + ‛ and ‚ – ‛ to make the equation below correct. (Write down the complete equation on the answer sheet).",
      "questionVn": "ine Dòng kẻ Equation Phép tính  ưu  viết toàn bộ phép tính vào phiếu trả lời. 1   3   5   7 = 6",
      "imageUrl": "/images/timo/grade1/final5/q12.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final5/q12_A.png",
        "/images/timo/grade1/final5/q12_B.png",
        "/images/timo/grade1/final5/q12_C.png",
        "/images/timo/grade1/final5/q12_D.png"
      ]
    },
    {
      "id": 13,
      "category": "Logical thinking",
      "questionEn": "Four children have 11 balloons in total and each of them have a different number of balloons. Given that every child has at least one balloon and Jimmy has the most balloons. How many balloons does he have?",
      "questionVn": "Balloon Quả bóng bay In total Tổng cộng Different number Số lượng khác nhau Most Nhiều nhất At least  t nhất.",
      "imageUrl": "/images/timo/grade1/final5/q13.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final5/q13_A.png",
        "/images/timo/grade1/final5/q13_B.png",
        "/images/timo/grade1/final5/q13_C.png",
        "/images/timo/grade1/final5/q13_D.png"
      ]
    },
    {
      "id": 14,
      "category": "Logical thinking",
      "questionEn": "How many two-digit numbers are there that the unit digit is 0?",
      "questionVn": "Two-digit number Số có hai chữ số Unit digit Chữ số hàng đơn vị.",
      "imageUrl": "/images/timo/grade1/final5/q14.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final5/q14_A.png",
        "/images/timo/grade1/final5/q14_B.png",
        "/images/timo/grade1/final5/q14_C.png",
        "/images/timo/grade1/final5/q14_D.png"
      ]
    },
    {
      "id": 15,
      "category": "Logical thinking",
      "questionEn": "According to the following pattern, find the value of the next term.",
      "questionVn": "Pattern Quy luật Value Giá trị Term Số hạng. 1, 4, 7, 10, 13, … Geometry / Hình học",
      "imageUrl": "/images/timo/grade1/final5/q15.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final5/q15_A.png",
        "/images/timo/grade1/final5/q15_B.png",
        "/images/timo/grade1/final5/q15_C.png",
        "/images/timo/grade1/final5/q15_D.png"
      ]
    },
    {
      "id": 16,
      "category": "Logical thinking",
      "questionEn": "How many squares are there in the figure below?",
      "questionVn": "Square Hình vuông Figure Hình vẽ.    52 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com",
      "imageUrl": "/images/timo/grade1/final5/q16.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final5/q16_A.png",
        "/images/timo/grade1/final5/q16_B.png",
        "/images/timo/grade1/final5/q16_C.png",
        "/images/timo/grade1/final5/q16_D.png"
      ]
    },
    {
      "id": 17,
      "category": "Logical thinking",
      "questionEn": "How many cubes are there in the figure below?",
      "questionVn": "Cube Hình lập phương Figure Hình vẽ.",
      "imageUrl": "/images/timo/grade1/final5/q17.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final5/q17_A.png",
        "/images/timo/grade1/final5/q17_B.png",
        "/images/timo/grade1/final5/q17_C.png",
        "/images/timo/grade1/final5/q17_D.png"
      ]
    },
    {
      "id": 18,
      "category": "Logical thinking",
      "questionEn": "How many triangles are there in the figure below?",
      "questionVn": "Triangle Hình tam giác Figure Hình vẽ.",
      "imageUrl": "/images/timo/grade1/final5/q18.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final5/q18_A.png",
        "/images/timo/grade1/final5/q18_B.png",
        "/images/timo/grade1/final5/q18_C.png",
        "/images/timo/grade1/final5/q18_D.png"
      ]
    },
    {
      "id": 19,
      "category": "Logical thinking",
      "questionEn": "Which polygon below has the most sides?",
      "questionVn": "Polygon Đa giác Most Nhiều nhất; Sides: Cạnh.",
      "imageUrl": "/images/timo/grade1/final5/q19.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final5/q19_A.png",
        "/images/timo/grade1/final5/q19_B.png",
        "/images/timo/grade1/final5/q19_C.png",
        "/images/timo/grade1/final5/q19_D.png"
      ]
    },
    {
      "id": 20,
      "category": "Logical thinking",
      "questionEn": "According to the pattern below, what is the figure in the space (‚__‛) provided?",
      "questionVn": "Pattern Quy luật Figure Hình vẽ Space Chỗ trống. ○ □ △ ○ ○ □ △ ○ __ □ △ ○ ○ □ △ Combinatorics / Tổ hợp",
      "imageUrl": "/images/timo/grade1/final5/q20.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final5/q20_A.png",
        "/images/timo/grade1/final5/q20_B.png",
        "/images/timo/grade1/final5/q20_C.png",
        "/images/timo/grade1/final5/q20_D.png"
      ]
    },
    {
      "id": 21,
      "category": "Logical thinking",
      "questionEn": "8 candies are split into 2 equal groups, how many candy(ies) is/ are there in each group?",
      "questionVn": "Split into Chia Equal groups Các nhóm bằng nhau.",
      "imageUrl": "/images/timo/grade1/final5/q21.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final5/q21_A.png",
        "/images/timo/grade1/final5/q21_B.png",
        "/images/timo/grade1/final5/q21_C.png",
        "/images/timo/grade1/final5/q21_D.png"
      ]
    },
    {
      "id": 22,
      "category": "Logical thinking",
      "questionEn": "Choose 2 numbers, without repetition, from 1, 3, 5, 8 to form a two-digit number. How many odd numbers are there?",
      "questionVn": "Without repetition Không lặp lại Form Ghép thành Two-digit number Số có hai chữ số Odd number Số lẻ.",
      "imageUrl": "/images/timo/grade1/final5/q22.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final5/q22_A.png",
        "/images/timo/grade1/final5/q22_B.png",
        "/images/timo/grade1/final5/q22_C.png",
        "/images/timo/grade1/final5/q22_D.png"
      ]
    },
    {
      "id": 23,
      "category": "Logical thinking",
      "questionEn": "There are 3 ways from school to train station and there are 2 ways from the train station to the library. How many different ways from school to the library through the train station?",
      "questionVn": "Different ways Các cách khác nhau Through Đi qua.",
      "imageUrl": "/images/timo/grade1/final5/q23.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final5/q23_A.png",
        "/images/timo/grade1/final5/q23_B.png",
        "/images/timo/grade1/final5/q23_C.png",
        "/images/timo/grade1/final5/q23_D.png"
      ]
    },
    {
      "id": 24,
      "category": "Logical thinking",
      "questionEn": "What is the smallest 4-digit number by using 3, 6, 1 and 8? (Each digit can be used once).",
      "questionVn": "Smallest 4-digit number Số nhỏ nhất có 4 chữ số Digit Chữ số Once Một lần.",
      "imageUrl": "/images/timo/grade1/final5/q24.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final5/q24_A.png",
        "/images/timo/grade1/final5/q24_B.png",
        "/images/timo/grade1/final5/q24_C.png",
        "/images/timo/grade1/final5/q24_D.png"
      ]
    },
    {
      "id": 25,
      "category": "Logical thinking",
      "questionEn": "Choose 2 numbers, without repetition, from 0, 3, 5, 6, 9 to form a 2-digit number. How many multiples of 5 are there?",
      "questionVn": "Without repetition Không lặp lại Form Ghép 2-digit number Số có 2 chữ số Multiple Bội.  53 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com ĐÁP ÁN THAM KHẢO PRELIMINARY ROUND / VÒNG LOẠI QUỐC GIA",
      "imageUrl": "/images/timo/grade1/final5/q25.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade1/final5/q25_A.png",
        "/images/timo/grade1/final5/q25_B.png",
        "/images/timo/grade1/final5/q25_C.png",
        "/images/timo/grade1/final5/q25_D.png"
      ]
    }
  ]
]
  },
  2: {
    preliminary: [
  [
    {
      "id": 1,
      "category": "Logical thinking",
      "questionEn": "Michael’s class has 5 boys and 6 girls. How many classmates does he have?",
      "questionVn": "Lớp của Michael có 5 bạn trai và 6 bạn gái. Hỏi Michael có bao nhiêu bạn cùng lớp?",
      "imageUrl": "/images/timo/grade2/test1/q1.png",
      "options": [
        "A. 11",
        "B. 10",
        "C. 12",
        "D. 9"
      ],
      "correctAnswer": "A. 11"
    },
    {
      "id": 2,
      "category": "Logical thinking",
      "questionEn": "If today is Wednesday and also the first day of March. Which day of the week is 9th March?",
      "questionVn": "Nếu hôm nay là thứ Tư và cũng là ngày đầu tiên của tháng 3. Vậy ngày 9 tháng 3 là ngày thứ mấy?",
      "imageUrl": "/images/timo/grade2/test1/q2.png",
      "options": [
        "A. Wednesday (Thứ Tư)",
        "B. Saturday (Thứ Bảy)",
        "C. Friday (Thứ Sáu)",
        "D. Thursday (Thứ Năm)"
      ],
      "correctAnswer": "A. Wednesday (Thứ Tư)"
    },
    {
      "id": 3,
      "category": "Logical thinking",
      "questionEn": "According to the pattern below, find the 15th figure counting from the left.",
      "questionVn": "Dựa vào quy luật dưới đây, tìm hình thứ 15 tính từ bên trái.          <",
      "imageUrl": "/images/timo/grade2/test1/q3.png",
      "options": [
        "A. ",
        "B. ",
        "C. △",
        "D. "
      ],
      "correctAnswer": "A. "
    },
    {
      "id": 4,
      "category": "Logical thinking",
      "questionEn": "Dan celebrated his 6th birthday 3 years ago. How old will he be 2 years later?",
      "questionVn": "Dan tổ chức sinh nhật lần thứ 6 vào 3 năm trước. Hỏi 2 năm nữa anh ấy mấy tuổi?",
      "imageUrl": "/images/timo/grade2/test1/q4.png",
      "options": [
        "A. 1",
        "B. 11",
        "C. 7",
        "D. 5"
      ],
      "correctAnswer": "A. 1"
    },
    {
      "id": 5,
      "category": "Logical thinking",
      "questionEn": "According to the pattern below, what is the value of the next number?",
      "questionVn": "Dựa vào quy luật của dãy số sau, giá trị của số tiếp theo là số nào? 50, 3, 45, 6, 40, 9, 35, 2, <",
      "imageUrl": "/images/timo/grade2/test1/q5.png",
      "options": [
        "A. 13",
        "B. 15",
        "C. 25",
        "D. 30"
      ],
      "correctAnswer": "A. 13"
    },
    {
      "id": 6,
      "category": "Arithmetic",
      "questionEn": "Find the value of 5 + 6 + 7 + 8 + 9 + 10.",
      "questionVn": "Tìm giá trị của 5 + 6 + 7 + 8 + 9 + 10.",
      "imageUrl": "/images/timo/grade2/test1/q6.png",
      "options": [
        "A. 50",
        "B. 55",
        "C. 40",
        "D. 45"
      ],
      "correctAnswer": "A. 50"
    },
    {
      "id": 7,
      "category": "Arithmetic",
      "questionEn": "Calculate 13 – 11 + 9 – 7 + 5 – 3 + 1.",
      "questionVn": "Tính 13 – 11 + 9 – 7 + 5 – 3 + 1.",
      "imageUrl": "/images/timo/grade2/test1/q7.png",
      "options": [
        "A. 14",
        "B. 6",
        "C. 7",
        "D. 10"
      ],
      "correctAnswer": "A. 14"
    },
    {
      "id": 8,
      "category": "Arithmetic",
      "questionEn": "Gordon thinks of a number. He adds 38 then subtracts 42 to get the smallest 2-digit odd number. Find Gordon’s number.",
      "questionVn": "Gordon nghĩ ra một số. Anh ấy lấy số đó cộng thêm 38 rồi trừ đi 42 thì được số lẻ nhỏ nhất có hai chữ số. Tìm số đó.",
      "imageUrl": "/images/timo/grade2/test1/q8.png",
      "options": [
        "A. 15",
        "B. 25",
        "C. 14",
        "D. 7"
      ],
      "correctAnswer": "A. 15"
    },
    {
      "id": 9,
      "category": "Arithmetic",
      "questionEn": "Let X and Y be different 1-digit numbers. If the equation below is correct, find the value of Y.",
      "questionVn": "Cho X và Y là các số có một chữ số khác nhau. Biết rằng phép toán dưới đây là đúng, tìm giá trị của Y.",
      "imageUrl": "/images/timo/grade2/test1/q9.png",
      "options": [
        "A. 4",
        "B. 8",
        "C. 9",
        "D. 7"
      ],
      "correctAnswer": "A. 4"
    },
    {
      "id": 10,
      "category": "Arithmetic",
      "questionEn": "According to the pattern of the following sequence, find the sum of the first eight numbers.",
      "questionVn": "Dựa vào quy luật dãy số dưới đây, hãy tìm tổng của 8 số đầu tiên. , , 2, 3, 5, 8, <",
      "imageUrl": "/images/timo/grade2/test1/q10.png",
      "options": [
        "A. 21",
        "B. 54",
        "C. 44",
        "D. 34"
      ],
      "correctAnswer": "A. 21"
    },
    {
      "id": 11,
      "category": "Number theory",
      "questionEn": "According to the pattern below, find the value of the 7th number in the sequence.",
      "questionVn": "Dựa vào quy luật dưới đây, tìm giá trị của số thứ 7 trong dãy. 3, 7,  , 5, <",
      "imageUrl": "/images/timo/grade2/test1/q11.png",
      "options": [
        "A. 18",
        "B. 19",
        "C. 23",
        "D. 27"
      ],
      "correctAnswer": "A. 18"
    },
    {
      "id": 12,
      "category": "Number theory",
      "questionEn": "From 7 to 23, how many 2-digit numbers are there?",
      "questionVn": "Trong các số từ 7 đến 23, hỏi có bao nhiêu số có hai chữ số?",
      "imageUrl": "/images/timo/grade2/test1/q12.png",
      "options": [
        "A. 13",
        "B. 14",
        "C. 15",
        "D. 16"
      ],
      "correctAnswer": "A. 13"
    },
    {
      "id": 13,
      "category": "Number theory",
      "questionEn": "Cara has 40 candies and Jolie has 20 candies. How many candies does Cara have to give Jolie to make them have the same number of candies?",
      "questionVn": "Cara có 40 cái kẹo và Jolie có 20 cái kẹo. Hỏi Cara phải cho Jolie bao nhiêu cái kẹo để hai bạn có số kẹo bằng nhau?",
      "imageUrl": "/images/timo/grade2/test1/q13.png",
      "options": [
        "A. 20",
        "B. 15",
        "C. 10",
        "D. 5"
      ],
      "correctAnswer": "A. 20"
    },
    {
      "id": 14,
      "category": "Number theory",
      "questionEn": "Refer to these numbers, how many odd numbers greater than 39 are there?",
      "questionVn": "Trong các số dưới đây, hỏi có bao nhiêu số lẻ lớn hơn 39? 12, 15, 28, 93, 35, 41, 90  14 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com",
      "imageUrl": "/images/timo/grade2/test1/q14.png",
      "options": [
        "A. 3",
        "B. 2",
        "C. 4",
        "D. 1"
      ],
      "correctAnswer": "A. 3"
    },
    {
      "id": 15,
      "category": "Number theory",
      "questionEn": "Fill in the blank to get a correct equation.",
      "questionVn": "Điền số thích hợp vào chỗ trống để được phép toán đúng. ____ + 27 = 19 + 48 – 23",
      "imageUrl": "/images/timo/grade2/test1/q15.png",
      "options": [
        "A. 17",
        "B. 27",
        "C. 61",
        "D. 71"
      ],
      "correctAnswer": "A. 17"
    },
    {
      "id": 16,
      "category": "Geometry",
      "questionEn": "At least how many cubes are there in the figure below?",
      "questionVn": "Hình dưới đây có ít nhất bao nhiêu khối lập phương?",
      "imageUrl": "/images/timo/grade2/test1/q16.png",
      "options": [
        "A. 8",
        "B. 7",
        "C. 6",
        "D. 9"
      ],
      "correctAnswer": "A. 8"
    },
    {
      "id": 17,
      "category": "Geometry",
      "questionEn": "At least how many squares can be seen if viewing the figure from top?",
      "questionVn": "Nếu nhìn hình dưới đây từ trên xuống thì có thể thấy được ít nhất bao nhiêu hình vuông?",
      "imageUrl": "/images/timo/grade2/test1/q17.png",
      "options": [
        "A. 3",
        "B. 4",
        "C. 6",
        "D. 5"
      ],
      "correctAnswer": "A. 3"
    },
    {
      "id": 18,
      "category": "Geometry",
      "questionEn": "How many triangles are there in the figure below?",
      "questionVn": "Hình dưới đây có bao nhiêu hình tam giác?",
      "imageUrl": "/images/timo/grade2/test1/q18.png",
      "options": [
        "A. 5",
        "B. 8",
        "C. 10",
        "D. 12"
      ],
      "correctAnswer": "A. 5"
    },
    {
      "id": 19,
      "category": "Geometry",
      "questionEn": "Daniel draws 6 lines on a sheet of paper. At most how many squares can be formed by Daniel?",
      "questionVn": "Daniel vẽ 6 đường thẳng trên một tờ giấy. Hỏi anh ấy có thể tạo ra nhiều nhất bao nhiêu hình vuông?  15 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com",
      "imageUrl": "/images/timo/grade2/test1/q19.png",
      "options": [
        "A. 1",
        "B. 4",
        "C. 5",
        "D. 6"
      ],
      "correctAnswer": "A. 1"
    },
    {
      "id": 20,
      "category": "Geometry",
      "questionEn": "According to the pattern shown below, how many circles are there in the first 20 figures?",
      "questionVn": "Dựa vào quy luật dưới đây, hỏi có bao nhiêu hình tròn trong 20 hình đầu tiên? ▲ ▲  ▲ <",
      "imageUrl": "/images/timo/grade2/test1/q20.png",
      "options": [
        "A. 6",
        "B. 8",
        "C. 10",
        "D. 12"
      ],
      "correctAnswer": "A. 6"
    },
    {
      "id": 21,
      "category": "Combinatorics",
      "questionEn": "Separate the following stars into 3 equal groups. How many stars are there in the first 2 groups?",
      "questionVn": "Chia các hình ngôi sao dưới đây thành 3 nhóm bằng nhau. Hỏi có bao nhiêu hình ngôi sao trong 2 nhóm đầu tiên? ★  ★  ★  ★  ★  ★  ★  ★  ★",
      "imageUrl": "/images/timo/grade2/test1/q21.png",
      "options": [
        "A. 3",
        "B. 4",
        "C. 6",
        "D. 9"
      ],
      "correctAnswer": "A. 3"
    },
    {
      "id": 22,
      "category": "Combinatorics",
      "questionEn": "Arrange these numbers in descending order to find the 4th largest number.",
      "questionVn": "Sắp xếp các số sau từ lớn đến bé để tìm số lớn thứ tư. 23, 91, 73, 39, 46, 82, 50",
      "imageUrl": "/images/timo/grade2/test1/q22.png",
      "options": [
        "A. 39",
        "B. 50",
        "C. 46",
        "D. 73"
      ],
      "correctAnswer": "A. 39"
    },
    {
      "id": 23,
      "category": "Combinatorics",
      "questionEn": "Tom chooses 2 different digits from 1, 4 and 7 to form 2-digit numbers. Among those numbers, how many odd numbers are there?",
      "questionVn": "Tom chọn 2 chữ số khác nhau từ 1, 4 và 7 để lập thành các số có hai chữ số. Hỏi trong số đó có bao nhiêu số lẻ?",
      "imageUrl": "/images/timo/grade2/test1/q23.png",
      "options": [
        "A. 3",
        "B. 4",
        "C. 5",
        "D. 6"
      ],
      "correctAnswer": "A. 3"
    },
    {
      "id": 24,
      "category": "Combinatorics",
      "questionEn": "In how many ways can we distribute 6 identical flowers into 3 different vases given that no vases are empty?",
      "questionVn": "Hỏi có bao nhiêu cách để cắm 6 bông hoa giống nhau vào 3 lọ hoa khác nhau sao cho lọ nào cũng có hoa?",
      "imageUrl": "/images/timo/grade2/test1/q24.png",
      "options": [
        "A. 2",
        "B. 9",
        "C. 10",
        "D. 18"
      ],
      "correctAnswer": "A. 2"
    },
    {
      "id": 25,
      "category": "Combinatorics",
      "questionEn": "Kesha has 2 different T-shirts and 3 different pants. Each day, she mixes a shirt with a pant to make a set of clothes. At most how many different sets of clothes can she mix?",
      "questionVn": "Kesha có 2 chiếc áo phông khác nhau và 3 chiếc quần khác nhau. Mỗi ngày, cô bé phối 1 chiếc áo với 1 chiếc quần để có một bộ quần áo. Hỏi cô bé có thể phối nhiều nhất bao nhiêu bộ quần áo khác nhau?",
      "imageUrl": "/images/timo/grade2/test1/q25.png",
      "options": [
        "A. 6",
        "B. 3",
        "C. 5",
        "D. 8"
      ],
      "correctAnswer": "A. 6"
    }
  ],
  [
    {
      "id": 1,
      "category": "Logical thinking",
      "questionEn": "If last month was April, which month will it be 16 months later?",
      "questionVn": "Biết tháng trước là tháng 4, hỏi 16 tháng nữa là tháng mấy?",
      "imageUrl": "/images/timo/grade2/test2/q1.png",
      "options": [
        "A. May (Tháng 5)",
        "B. September (Tháng 9)",
        "C. August (Tháng 8)",
        "D. December (Tháng 12)"
      ],
      "correctAnswer": "A. May (Tháng 5)"
    },
    {
      "id": 2,
      "category": "Logical thinking",
      "questionEn": "By observing the pattern, what is the English letter in the space (‚__‛) provided?",
      "questionVn": "Quan sát quy luật dưới đây để điền chữ cái Tiếng Anh thích hợp vào chỗ trống (‚__‛). A , Z , B , __ , C , X , D , W , <",
      "imageUrl": "/images/timo/grade2/test2/q2.png",
      "options": [
        "A. E",
        "B. S",
        "C. U",
        "D. Y"
      ],
      "correctAnswer": "A. E"
    },
    {
      "id": 3,
      "category": "Logical thinking",
      "questionEn": "Observe the sequence below to replace the music note with a suitable number.",
      "questionVn": "Quan sát dãy số dưới đây để thay thế nốt nhạc bằng số thích hợp. 50 , 49 , 47 , 44 , 40 , , <",
      "imageUrl": "/images/timo/grade2/test2/q3.png",
      "options": [
        "A. 35",
        "B. 39",
        "C. 30",
        "D. 36"
      ],
      "correctAnswer": "A. 35"
    },
    {
      "id": 4,
      "category": "Logical thinking",
      "questionEn": "Refer to the pattern below, how many arrows are there in the 5th Group?",
      "questionVn": "Dựa vào quy luật dưới đây, hỏi sẽ có bao nhiêu mũi tên trong nhóm thứ 5?",
      "imageUrl": "/images/timo/grade2/test2/q4.png",
      "options": [
        "A. 15",
        "B. 20",
        "C. 21",
        "D. 16"
      ],
      "correctAnswer": "A. 15"
    },
    {
      "id": 5,
      "category": "Logical thinking",
      "questionEn": "Each cupcake costs $2. Alice had $23 and she bought 7 cupcakes. How much money did she have left?",
      "questionVn": "Mỗi cái bánh có giá 2 đô. Alice có 23 đô và cô bé mua 7 cái bánh. Hỏi khi đó cô bé còn lại bao nhiêu tiền?",
      "imageUrl": "/images/timo/grade2/test2/q5.png",
      "options": [
        "A. $14",
        "B. $9",
        "C. $21",
        "D. $8"
      ],
      "correctAnswer": "A. $14"
    },
    {
      "id": 6,
      "category": "Arithmetic",
      "questionEn": "Find the value of 28 + 43 + 72 + 29 + 11+ 37.",
      "questionVn": "Tìm giá trị của 28 + 43 + 72 + 29 + 11+ 37.  17 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com",
      "imageUrl": "/images/timo/grade2/test2/q6.png",
      "options": [
        "A. 220",
        "B. 200",
        "C. 210",
        "D. 230"
      ],
      "correctAnswer": "A. 220"
    },
    {
      "id": 7,
      "category": "Arithmetic",
      "questionEn": "Which number should the flower be replaced by to get a correct equation?",
      "questionVn": "Hỏi cần thay thế bông hoa dưới đây bởi số nào để được phép tính đúng?  +  - 22 =  + 24",
      "imageUrl": "/images/timo/grade2/test2/q7.png",
      "options": [
        "A. 23",
        "B. 46",
        "C. 2",
        "D. 40"
      ],
      "correctAnswer": "A. 23"
    },
    {
      "id": 8,
      "category": "Arithmetic",
      "questionEn": "Find the value of 2 + 4 + 6 + < + 6 + 8.",
      "questionVn": "Tính giá trị của 2 + 4 + 6 + < + 16 + 18.",
      "imageUrl": "/images/timo/grade2/test2/q8.png",
      "options": [
        "A. 100",
        "B. 80",
        "C. 90",
        "D. 180"
      ],
      "correctAnswer": "A. 100"
    },
    {
      "id": 9,
      "category": "Arithmetic",
      "questionEn": "Calculate: 7 2 11 2 2 3 2 9  .",
      "questionVn": "Tính: 7 2 11 2 2 3 2 9  .",
      "imageUrl": "/images/timo/grade2/test2/q9.png",
      "options": [
        "A. 60",
        "B. 50",
        "C. 40",
        "D. 70"
      ],
      "correctAnswer": "A. 60"
    },
    {
      "id": 10,
      "category": "Arithmetic",
      "questionEn": "A and B represent different 1-digit numbers. What is the value of B if the equation is correct?",
      "questionVn": "Biết A và B biểu diễn các số có 1 chữ số khác nhau, hỏi giá trị của B là bao nhiêu để ta được phép tính đúng dưới đây?",
      "imageUrl": "/images/timo/grade2/test2/q10.png",
      "options": [
        "A. 5",
        "B. 6",
        "C. 3",
        "D. 4"
      ],
      "correctAnswer": "A. 5"
    },
    {
      "id": 11,
      "category": "Number theory",
      "questionEn": "Determine whether the sum  + 2 + 3 + 4 + < + 9 is odd or even.",
      "questionVn": "Tổng 1 + 2 + 3 + < + 9 là số lẻ hay số chẵn?",
      "imageUrl": "/images/timo/grade2/test2/q11.png",
      "options": [
        "A. Odd (Số lẻ)",
        "B. Even (Sỗ chẵn)",
        "C. Both odd and even (Vừa chẵn vừa lẻ)",
        "D. Neither odd nor even (Không lẻ không chẵn)"
      ],
      "correctAnswer": "A. Odd (Số lẻ)"
    },
    {
      "id": 12,
      "category": "Number theory",
      "questionEn": "A box has balls with consecutive even numbers from 10 to 40. How many balls are there in the box?",
      "questionVn": "Một hộp chứa các quả bóng được đánh số chẵn liên tiếp từ 10 đến 40. Hỏi có bao nhiêu quả bóng trong hộp đó?",
      "imageUrl": "/images/timo/grade2/test2/q12.png",
      "options": [
        "A. 15",
        "B. 16",
        "C. 31",
        "D. 40"
      ],
      "correctAnswer": "A. 15"
    },
    {
      "id": 13,
      "category": "Number theory",
      "questionEn": "Find the next number in the arithmetic sequence below.",
      "questionVn": "Tìm số tiếp theo trong dãy số cách đều dưới đây.  18 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com 419、398、377、356、<",
      "imageUrl": "/images/timo/grade2/test2/q13.png",
      "options": [
        "A. 355",
        "B. 314",
        "C. 335",
        "D. 345"
      ],
      "correctAnswer": "A. 355"
    },
    {
      "id": 14,
      "category": "Number theory",
      "questionEn": "Andy gave Betty 27 marbles and Betty gave Charlie 13 marbles so that they have the same number of marbles. How many marbles does Andy have more than Charlie originally?",
      "questionVn": "Andy cho Betty 27 viên bi và Betty cho Charlie 13 viên bi thì ba bạn có số bi bằng nhau. Hỏi lúc đầu Andy có nhiều hơn Charlie bao nhiêu viên bi?",
      "imageUrl": "/images/timo/grade2/test2/q14.png",
      "options": [
        "A. 27",
        "B. 41",
        "C. 14",
        "D. 40"
      ],
      "correctAnswer": "A. 27"
    },
    {
      "id": 15,
      "category": "Number theory",
      "questionEn": "David collected 19 stamps. His brother collected 12 stamps. One page of the collection can contain no more than 9 stamps. At least how many pages are required to present all stamps of 2 brothers?",
      "questionVn": "David sưu tầm được 19 cái tem. Anh trai David sưu tầm được 12 cái tem. Mỗi trang của bộ sưu tập không chứa được nhiều hơn 9 cái tem. Hỏi cần ít nhất bao nhiêu trang để trưng bày được toàn bộ số tem của hai anh em?",
      "imageUrl": "/images/timo/grade2/test2/q15.png",
      "options": [
        "A. 2",
        "B. 3",
        "C. 4",
        "D. 5"
      ],
      "correctAnswer": "A. 2"
    },
    {
      "id": 16,
      "category": "Geometry",
      "questionEn": "How many squares are there in the figure below?",
      "questionVn": "Hỏi có bao nhiêu hình vuông trong hình dưới đây?",
      "imageUrl": "/images/timo/grade2/test2/q16.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/test2/q16_A.png",
        "/images/timo/grade2/test2/q16_B.png",
        "/images/timo/grade2/test2/q16_C.png",
        "/images/timo/grade2/test2/q16_D.png"
      ]
    },
    {
      "id": 17,
      "category": "Geometry",
      "questionEn": "At least how many unit squares are seen if viewing the figure below from the right?",
      "questionVn": "Hỏi có thể nhìn thấy ít nhất bao nhiêu hình vuông đơn vị nếu nhìn hình dưới đây từ phía bên phải?",
      "imageUrl": "/images/timo/grade2/test2/q17.png",
      "options": [
        "A. 4",
        "B. 3",
        "C. 7",
        "D. 6"
      ],
      "correctAnswer": "A. 4"
    },
    {
      "id": 18,
      "category": "Geometry",
      "questionEn": "How many edges does a cube have?",
      "questionVn": "Hỏi một hình lập phương có bao nhiêu cạnh?  19 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com",
      "imageUrl": "/images/timo/grade2/test2/q18.png",
      "options": [
        "A. 16",
        "B. 12",
        "C. 9",
        "D. 8"
      ],
      "correctAnswer": "A. 16"
    },
    {
      "id": 19,
      "category": "Geometry",
      "questionEn": "How many line segments are there in the figure below?",
      "questionVn": "Hỏi có bao nhiêu đoạn thẳng trong hình dưới đây?",
      "imageUrl": "/images/timo/grade2/test2/q19.png",
      "options": [
        "A. 18",
        "B. 24",
        "C. 16",
        "D. 28"
      ],
      "correctAnswer": "A. 18"
    },
    {
      "id": 20,
      "category": "Geometry",
      "questionEn": "Refer to the figure sequence below. How many triangles are there in the first 23 symbols counting from the left?",
      "questionVn": "Xét dãy hình dưới đây. Hỏi có bao nhiêu hình tam giác trong 23 hình đầu tiên tính từ phía bên trái? <",
      "imageUrl": "/images/timo/grade2/test2/q20.png",
      "options": [
        "A. 9",
        "B. 10",
        "C. 8",
        "D. 6"
      ],
      "correctAnswer": "A. 9"
    },
    {
      "id": 21,
      "category": "Combinatorics",
      "questionEn": "A 4-digit number is formed by choosing 4 numbers without repetition from 0, 1, 3, 7 and 9. What is the difference between the largest and the smallest value?",
      "questionVn": "Một số có 4 chữ số được tạo ra bằng cách chọn 4 số không lặp lại từ 0, 1, 3, 7 và 9. Tìm hiệu giữa giá trị lớn nhất và giá trị nhỏ nhất có thể chọn được.",
      "imageUrl": "/images/timo/grade2/test2/q21.png",
      "options": [
        "A. 9594",
        "B. 8999",
        "C. 8352",
        "D. 8694"
      ],
      "correctAnswer": "A. 9594"
    },
    {
      "id": 22,
      "category": "Combinatorics",
      "questionEn": "The librarian needs to move some books so that 3 shelves below have the same number of books. At least how many books does she have to move?",
      "questionVn": "Thủ thư cần di chuyển một số sách để cả 3 ngăn có số sách bằng nhau. Hỏi cô ấy cần di chuyển ít nhất bao nhiêu quyển sách?",
      "imageUrl": "/images/timo/grade2/test2/q22.png",
      "options": [
        "A. 5",
        "B. 6",
        "C. 3",
        "D. 2"
      ],
      "correctAnswer": "A. 5"
    },
    {
      "id": 23,
      "category": "Combinatorics",
      "questionEn": "Choose 3 digits, can have repetition, from 0, 1, 3, 6 and 9 to form 3-digit even numbers. How many different numbers can be formed?",
      "questionVn": "Chọn 3 chữ số (có thể được chọn lặp lại) từ 0, 1, 3, 6 và 9 để lập thành các số chẵn có 3 chữ số. Hỏi có thể lập được bao nhiêu số khác nhau như vậy?",
      "imageUrl": "/images/timo/grade2/test2/q23.png",
      "options": [
        "A. 40",
        "B. 20",
        "C. 24",
        "D. 30"
      ],
      "correctAnswer": "A. 40"
    },
    {
      "id": 24,
      "category": "Combinatorics",
      "questionEn": "For every 4 pens, the store gives each customer 2 erasers for free. If Fred buys 15 pens, how many erasers can he get?",
      "questionVn": "Cứ mua 4 chiếc bút thì khách hàng được tặng 2 cục tẩy miễn phí. Nếu Fred mua 15 chiếc bút thì anh ấy nhận được bao nhiêu cục tẩy?",
      "imageUrl": "/images/timo/grade2/test2/q24.png",
      "options": [
        "A. 7",
        "B. 3",
        "C. 8",
        "D. 6"
      ],
      "correctAnswer": "A. 7"
    },
    {
      "id": 25,
      "category": "Combinatorics",
      "questionEn": "The 3 x 3 square below contains 9 consecutive numbers from 1 to 9 in each cell and the sum of numbers in each column or row is equal. Find the number that should be filled in cell A.",
      "questionVn": "Hình vuông 3 x 3 dưới đây gồm 9 số liên tiếp từ 1 đến 9 được điền vào mỗi ô. Tổng các số ở mỗi hàng và mỗi cột là bằng nhau. Hãy tìm số thích hợp để điền vào ô A.",
      "imageUrl": "/images/timo/grade2/test2/q25.png",
      "options": [
        "A. 2",
        "B. 4",
        "C. 6",
        "D. 8"
      ],
      "correctAnswer": "A. 2"
    }
  ],
  [
    {
      "id": 1,
      "category": "Logical thinking",
      "questionEn": "If the day before yesterday was Tuesday, which day of the week will 4 days later be?",
      "questionVn": "Nếu ngày trước ngày hôm qua là thứ Ba, hỏi 4 ngày nữa là thứ mấy trong tuần?",
      "imageUrl": "/images/timo/grade2/test3/q1.png",
      "options": [
        "A. Monday (Thứ Hai)",
        "B. Tuesday (Thứ Ba)",
        "C. Wednesday (Thứ Tư)",
        "D. Thursday (Thứ Năm)"
      ],
      "correctAnswer": "A. Monday (Thứ Hai)"
    },
    {
      "id": 2,
      "category": "Logical thinking",
      "questionEn": "17 children form a line. There are 9 people in front of Amy. What is her position counting form behind?",
      "questionVn": "17 đứa trẻ tạo thành một hàng. Có 9 người ở phía trước Amy. Hỏi vị trí của cô ấy đếm từ phía sau là thứ mấy?",
      "imageUrl": "/images/timo/grade2/test3/q2.png",
      "options": [
        "A. 6",
        "B. 7",
        "C. 8",
        "D. 9"
      ],
      "correctAnswer": "A. 6"
    },
    {
      "id": 3,
      "category": "Logical thinking",
      "questionEn": "According to the pattern shown below, what is the number in the blank?",
      "questionVn": "Dựa vào quy luật dưới đây, số ở chỗ trống là số nào? 2 、 6 、 12 、 20 、 30 、 42 、 __",
      "imageUrl": "/images/timo/grade2/test3/q3.png",
      "options": [
        "A. 55",
        "B. 56",
        "C. 57",
        "D. 58"
      ],
      "correctAnswer": "A. 55"
    },
    {
      "id": 4,
      "category": "Logical thinking",
      "questionEn": "John goes to school by bus and he needs to pay $5 each time. How much does he have to pay if he goes to school and goes back home during a week by bus?",
      "questionVn": "John đi đến trường bằng xe buýt và anh ấy cần trả $5 mỗi lần. Hỏi anh ấy phải trả bao nhiêu tiền nếu anh ấy đi đến trường và đi về nhà trong một tuần bằng xe buýt?",
      "imageUrl": "/images/timo/grade2/test3/q4.png",
      "options": [
        "A. $30",
        "B. $35",
        "C. $65",
        "D. $70"
      ],
      "correctAnswer": "A. $30"
    },
    {
      "id": 5,
      "category": "Logical thinking",
      "questionEn": "According to the pattern shown below, how many  are there in the 13th group?",
      "questionVn": "Dựa vào quy luật dưới đây, có bao nhiêu  trong nhóm thứ 13?",
      "imageUrl": "/images/timo/grade2/test3/q5.png",
      "options": [
        "A. 23",
        "B. 24",
        "C. 25",
        "D. 26"
      ],
      "correctAnswer": "A. 23"
    },
    {
      "id": 6,
      "category": "Arithmetic",
      "questionEn": "Find the value of 3 13 23 33 7 17 27 37       .",
      "questionVn": "Tìm giá trị của 3 13 23 33 7 17 27 37       .",
      "imageUrl": "/images/timo/grade2/test3/q6.png",
      "options": [
        "A. 160",
        "B. 161",
        "C. 162",
        "D. 163"
      ],
      "correctAnswer": "A. 160"
    },
    {
      "id": 7,
      "category": "Arithmetic",
      "questionEn": "Find the value of 45 6 27 6   .",
      "questionVn": "Tìm giá trị của 45 6 27 6   .",
      "imageUrl": "/images/timo/grade2/test3/q7.png",
      "options": [
        "A. 60",
        "B. 72",
        "C. 78",
        "D. 66"
      ],
      "correctAnswer": "A. 60"
    },
    {
      "id": 8,
      "category": "Arithmetic",
      "questionEn": "Find the value of 1 4 7 10 13 16 19 18 15 12 9 6 3        .",
      "questionVn": "Tìm giá trị của 1 4 7 10 13 16 19 18 15 12 9 6 3        .",
      "imageUrl": "/images/timo/grade2/test3/q8.png",
      "options": [
        "A. 5",
        "B. 6",
        "C. 7",
        "D. 8"
      ],
      "correctAnswer": "A. 5"
    },
    {
      "id": 9,
      "category": "Arithmetic",
      "questionEn": "What is the number that should be filled in the blank if the equation below is correct?",
      "questionVn": "Số nào nên được điền vào chỗ trống nếu phép tính dưới đây đúng? _____ 7 14  ",
      "imageUrl": "/images/timo/grade2/test3/q9.png",
      "options": [
        "A. 2",
        "B. 3",
        "C. 96",
        "D. 98"
      ],
      "correctAnswer": "A. 2"
    },
    {
      "id": 10,
      "category": "Arithmetic",
      "questionEn": "If A and B are different 1-digit numbers, what is the value of B if the equation is correct?",
      "questionVn": "Nếu A và B là các số có 1 chữ số khác nhau, giá trị của B là bao nhiêu nếu phép tính sau đúng?",
      "imageUrl": "/images/timo/grade2/test3/q10.png",
      "options": [
        "A. 3",
        "B. 2",
        "C. 4",
        "D. 5"
      ],
      "correctAnswer": "A. 3"
    },
    {
      "id": 11,
      "category": "Number theory",
      "questionEn": "Amy has 28 apples and John has 82 apples. How many apples does John have to give Amy to make them have the same number of apples?",
      "questionVn": "Amy có 28 quả táo và John có 82 quả táo. Hỏi John phải đưa cho Amy bao nhiêu quả táo để họ có số táo bằng nhau?",
      "imageUrl": "/images/timo/grade2/test3/q11.png",
      "options": [
        "A. 25",
        "B. 26",
        "C. 27",
        "D. 28"
      ],
      "correctAnswer": "A. 25"
    },
    {
      "id": 12,
      "category": "Number theory",
      "questionEn": "4 children have odd number of balloons in total. Two children have odd numbers of balloons and one child has even number of balloons. Determine the number of balloons of the remaining child is odd or even.",
      "questionVn": "4 bạn nhỏ có tổng số bóng bay là số lẻ. 2 bạn có số bóng bay là lẻ và 1 bạn có số bóng bay là chẵn. Xác định số bóng bay của bạn còn lại là lẻ hay chẵn.",
      "imageUrl": "/images/timo/grade2/test3/q12.png",
      "options": [
        "A. Odd (Số lẻ)",
        "B. Even (Số chẵn)",
        "C. Both odd and even (Vừa chẵn vừa lẻ)",
        "D. Neither odd nor even (Không lẻ không chẵn)"
      ],
      "correctAnswer": "A. Odd (Số lẻ)"
    },
    {
      "id": 13,
      "category": "Number theory",
      "questionEn": "The numbers below follow the arithmetic sequence. What is the 13th number?",
      "questionVn": "Các số dưới đây là một dãy số cách đều. Số thứ 13 là số nào? 123、120、117、114、111、<",
      "imageUrl": "/images/timo/grade2/test3/q13.png",
      "options": [
        "A. 87",
        "B. 88",
        "C. 89",
        "D. 90"
      ],
      "correctAnswer": "A. 87"
    },
    {
      "id": 14,
      "category": "Number theory",
      "questionEn": "How many 2-digit numbers having the units digit that is smaller than 2 are there?",
      "questionVn": "Có bao nhiêu số có 2 chữ số có chữ số hàng đơn vị nhỏ hơn 2?",
      "imageUrl": "/images/timo/grade2/test3/q14.png",
      "options": [
        "A. 17",
        "B. 18",
        "C. 19",
        "D. 20"
      ],
      "correctAnswer": "A. 17"
    },
    {
      "id": 15,
      "category": "Number theory",
      "questionEn": "Fill the lines with ‘ + ‘ and ‘‘ to make the equation below correct.",
      "questionVn": "Điền vào dòng kẻ với ‘+’ và ‘×’ để tạo thành phép tính đúng. 1   1   2   3   4 = 12",
      "imageUrl": "/images/timo/grade2/test3/q15.png",
      "options": [
        "A. 1 1 2 3"
      ],
      "correctAnswer": "A. 1 1 2 3"
    },
    {
      "id": 16,
      "category": "Geometry",
      "questionEn": "How many squares are there in the figure below?",
      "questionVn": "Có bao nhiêu hình vuông trong hình dưới đây?",
      "imageUrl": "/images/timo/grade2/test3/q16.png",
      "options": [
        "A. 12",
        "B. 14",
        "C. 15",
        "D. 17"
      ],
      "correctAnswer": "A. 12"
    },
    {
      "id": 17,
      "category": "Geometry",
      "questionEn": "How many sides does a rectangle have?",
      "questionVn": "Một hình chữ nhật có bao nhiêu cạnh?",
      "imageUrl": "/images/timo/grade2/test3/q17.png",
      "options": [
        "A. 3",
        "B. 6",
        "C. 4",
        "D. 5"
      ],
      "correctAnswer": "A. 3"
    },
    {
      "id": 18,
      "category": "Geometry",
      "questionEn": "According to the pattern shown below, what is the figure in the space (‚__‛) provided?",
      "questionVn": "Dựa vào quy luật dưới đây, hình điền vào chỗ trống (‚__‛) là hình gì? △ □ ○ ○ △ △ □ ○ ○ △ △ □ ○ ○ __ △<",
      "imageUrl": "/images/timo/grade2/test3/q18.png",
      "options": [
        "A. □",
        "B. ○",
        "C. △",
        "D. ◎"
      ],
      "correctAnswer": "A. □"
    },
    {
      "id": 19,
      "category": "Geometry",
      "questionEn": "At least how many squares can be seen if viewing the figure below from top?",
      "questionVn": "Có ít nhất bao nhiêu hình vuông có thể thấy nếu nhìn hình dưới đây từ trên xuống?",
      "imageUrl": "/images/timo/grade2/test3/q19.png",
      "options": [
        "A. 5",
        "B. 6",
        "C. 7",
        "D. 8"
      ],
      "correctAnswer": "A. 5"
    },
    {
      "id": 20,
      "category": "Geometry",
      "questionEn": "At most how many lines can be formed by using 4 points on a plane?",
      "questionVn": "Có nhiều nhất bao nhiêu đường thẳng có thể tạo thành từ 4 điểm trên một mặt phẳng?",
      "imageUrl": "/images/timo/grade2/test3/q20.png",
      "options": [
        "A. 3",
        "B. 4",
        "C. 5",
        "D. 6"
      ],
      "correctAnswer": "A. 3"
    },
    {
      "id": 21,
      "category": "Combinatorics",
      "questionEn": "Amy, Andy and Johnny have some candies. After Amy gives 6 candies to Andy and 4 candies to Johnny, they have equal numbers of candies. How many candys did Amy have more than Johnny originally?",
      "questionVn": "Amy, Andy và Johnny có một số cái kẹo. Sau khi Amy cho Andy 6 cái kẹo và cho Johnny 4 cái kẹo, thì họ có số kẹo bằng nhau. Hỏi lúc đầu Amy có nhiều hơn Johnny bao nhiêu cái kẹo?",
      "imageUrl": "/images/timo/grade2/test3/q21.png",
      "options": [
        "A. 15",
        "B. 16",
        "C. 12",
        "D. 14"
      ],
      "correctAnswer": "A. 15"
    },
    {
      "id": 22,
      "category": "Combinatorics",
      "questionEn": "What is the smallest 4-digit number by using 3, 5, 7 and 0? (Each digit can only be used once).",
      "questionVn": "Số nhỏ nhất có 4 chữ số tạo bởi các chữ số 3, 5, 7 và 0 là số nào? (Mỗi chữ số chỉ có thể dùng một lần).",
      "imageUrl": "/images/timo/grade2/test3/q22.png",
      "options": [
        "A. 3057",
        "B. 0357",
        "C. 3750",
        "D. 3507"
      ],
      "correctAnswer": "A. 3057"
    },
    {
      "id": 23,
      "category": "Combinatorics",
      "questionEn": "Pick 2 from 5 children to take part in mathematics competition. How many different combinations are there?",
      "questionVn": "Chọn 2 trong 5 học sinh để tham gia một cuộc thi toán. Hỏi có bao nhiêu cách chọn?",
      "imageUrl": "/images/timo/grade2/test3/q23.png",
      "options": [
        "A. 2",
        "B. 5",
        "C. 10",
        "D. 11"
      ],
      "correctAnswer": "A. 2"
    },
    {
      "id": 24,
      "category": "Combinatorics",
      "questionEn": "How many even numbers are there in the first 26 numbers?",
      "questionVn": "Có bao nhiêu số chẵn trong 26 số đầu tiên? 1, 5, 6, 11, 17, 28, <",
      "imageUrl": "/images/timo/grade2/test3/q24.png",
      "options": [
        "A. 8",
        "B. 9",
        "C. 10",
        "D. 11"
      ],
      "correctAnswer": "A. 8"
    },
    {
      "id": 25,
      "category": "Combinatorics",
      "questionEn": "Jack has 4 $1 coins, 3 $2 coins and 2 $5 coins, how many different values of a product can he buy without any changes?",
      "questionVn": "Jack có 4 đồng $1, 3 đồng $2 và 2 đồng $5, hỏi có bao nhiêu giá trị khác nhau của một món hàng mà anh ấy có thể mua mà không có tiền thừa trả lại?",
      "imageUrl": "/images/timo/grade2/test3/q25.png",
      "options": [
        "A. 10",
        "B. 15",
        "C. 20",
        "D. 25"
      ],
      "correctAnswer": "A. 10"
    }
  ],
  [
    {
      "id": 1,
      "category": "Logical thinking",
      "questionEn": "According to the pattern shown below, what is the number in the blank (‚__‛)?",
      "questionVn": "Dựa vào quy luật dưới đây, số ở chỗ trống (‚__‛) là số nào? 8 、 10 、 14 、 20 、 28 、 38 、 __ 、<.",
      "imageUrl": "/images/timo/grade2/test4/q1.png",
      "options": [
        "A. 48",
        "B. 49",
        "C. 50",
        "D. 51"
      ],
      "correctAnswer": "A. 48"
    },
    {
      "id": 2,
      "category": "Logical thinking",
      "questionEn": "If the day after tomorrow will be Wednesday, which day of the week will 5 days later be?",
      "questionVn": "Nếu ngày sau ngày mai là thứ Tư, hỏi 5 ngày nữa là thứ mấy trong tuần?",
      "imageUrl": "/images/timo/grade2/test4/q2.png",
      "options": [
        "A. Saturday (Thứ Bảy)",
        "B. Tuesday (Thứ Ba)",
        "C. Wednesday (Thứ Tư)",
        "D. Thursday (Thứ Năm)"
      ],
      "correctAnswer": "A. Saturday (Thứ Bảy)"
    },
    {
      "id": 3,
      "category": "Logical thinking",
      "questionEn": "30 children form a row. Alice is the 11th starting from the front. What is her position counting form behind?",
      "questionVn": "30 đứa trẻ tạo thành một hàng. Alice ở vị trí thứ 11 tính từ phía trước. Hỏi vị trí của cô ấy khi đếm từ phía sau là bao nhiêu?",
      "imageUrl": "/images/timo/grade2/test4/q3.png",
      "options": [
        "A. 19",
        "B. 20",
        "C. 21",
        "D. 22"
      ],
      "correctAnswer": "A. 19"
    },
    {
      "id": 4,
      "category": "Logical thinking",
      "questionEn": "Alice needs 10 minutes to finish a lap. Then she needs to rest 1 minute. How many minutes does she take to finish 10 laps if she continues her method?",
      "questionVn": "Alice cần 10 phút để hoàn thành một vòng dây. Sau đó cô ấy nghỉ 1 phút. Hỏi cô ấy mất bao nhiêu phút để hoàn thành 10 vòng dây nếu cô ấy cứ làm như vậy?",
      "imageUrl": "/images/timo/grade2/test4/q4.png",
      "options": [
        "A. 100",
        "B. 109",
        "C. 110",
        "D. 90"
      ],
      "correctAnswer": "A. 100"
    },
    {
      "id": 5,
      "category": "Logical thinking",
      "questionEn": "According to the pattern shown below, how many ◎ are there in the 9th group?",
      "questionVn": "Dựa vào quy luật dưới đây, có bao nhiêu ◎ trong nhóm thứ 9?",
      "imageUrl": "/images/timo/grade2/test4/q5.png",
      "options": [
        "A. 46",
        "B. 47",
        "C. 48",
        "D. 49"
      ],
      "correctAnswer": "A. 46"
    },
    {
      "id": 6,
      "category": "Arithmetic",
      "questionEn": "Find the value of 1 3 5 7 9 11 13 15    .",
      "questionVn": "Tìm giá trị của 1 3 5 7 9 11 13 15    .",
      "imageUrl": "/images/timo/grade2/test4/q6.png",
      "options": [
        "A. 64",
        "B. 65",
        "C. 66",
        "D. 67"
      ],
      "correctAnswer": "A. 64"
    },
    {
      "id": 7,
      "category": "Arithmetic",
      "questionEn": "Find the value of 3 3 6 2 9 1 18 2  .",
      "questionVn": "Tìm giá trị của 3 3 6 2 9 1 18 2  .",
      "imageUrl": "/images/timo/grade2/test4/q7.png",
      "options": [
        "A. 63",
        "B. 64",
        "C. 65",
        "D. 66"
      ],
      "correctAnswer": "A. 63"
    },
    {
      "id": 8,
      "category": "Arithmetic",
      "questionEn": "Find the value of 7 4 5 3 .",
      "questionVn": "Tìm giá trị của 7 4 5 3 .",
      "imageUrl": "/images/timo/grade2/test4/q8.png",
      "options": [
        "A. 11",
        "B. 12",
        "C. 13",
        "D. 14"
      ],
      "correctAnswer": "A. 11"
    },
    {
      "id": 9,
      "category": "Arithmetic",
      "questionEn": "What is the number that should be filled in the blank if the equation below is correct?",
      "questionVn": "Số được điền vào chỗ trống nếu phép tính dưới đây đúng là số nào? _____ 3 13 28  ",
      "imageUrl": "/images/timo/grade2/test4/q9.png",
      "options": [
        "A. 15",
        "B. 75",
        "C. 17",
        "D. 45"
      ],
      "correctAnswer": "A. 15"
    },
    {
      "id": 10,
      "category": "Arithmetic",
      "questionEn": "Refer to the puzzle on the right, find the value of B.",
      "questionVn": "Dựa vào phép tính bên phải, tìm giá trị của B.",
      "imageUrl": "/images/timo/grade2/test4/q10.png",
      "options": [
        "A. 3",
        "B. 4",
        "C. 5",
        "D. 6"
      ],
      "correctAnswer": "A. 3"
    },
    {
      "id": 11,
      "category": "Number theory",
      "questionEn": "Alice has 31 pencils and Peter has 92 pencils. How many pencils does Alice have to ask Peter to give her to make Peter has 11 less pencils than Alice?",
      "questionVn": "Alice có 31 cái bút chì và Peter có 92 cái bút chì. Hỏi Alice cần xin Peter đưa cho bạn ấy bao nhiêu các bút chì để sau đó Peter có ít hơn Alice 11 cái bút chì?",
      "imageUrl": "/images/timo/grade2/test4/q11.png",
      "options": [
        "A. 32",
        "B. 34",
        "C. 36",
        "D. 38"
      ],
      "correctAnswer": "A. 32"
    },
    {
      "id": 12,
      "category": "Number theory",
      "questionEn": "15 students have even number of scores of mathematics test in total. 7 children have odd number of scores and 3 children has even number of scores. Determine the sum of scores of the remaining children is odd or even.",
      "questionVn": "15 học sinh có tổng số điểm của bài thi toán là số chẵn. 7 bạn có số điểm lẻ và 3 bạn có số điểm chẵn. Xác định tổng điểm của các bạn còn lại là lẻ hay chẵn.",
      "imageUrl": "/images/timo/grade2/test4/q12.png",
      "options": [
        "A. Odd (Số lẻ)",
        "B. Even (Số chẵn)",
        "C. Both odd and even (Vừa chẵn vừa lẻ)",
        "D. Neither odd nor even (Không lẻ không chẵn)"
      ],
      "correctAnswer": "A. Odd (Số lẻ)"
    },
    {
      "id": 13,
      "category": "Number theory",
      "questionEn": "The numbers below follow the arithmetic sequence. What is the 9th number?",
      "questionVn": "Các số dưới đây là một dãy cách đều. Hỏi số thứ 9 là số nào? 198、187、176、165、154、<",
      "imageUrl": "/images/timo/grade2/test4/q13.png",
      "options": [
        "A. 108",
        "B. 109",
        "C. 110",
        "D. 111"
      ],
      "correctAnswer": "A. 108"
    },
    {
      "id": 14,
      "category": "Number theory",
      "questionEn": "How many 3-digit numbers having the units digit that is smaller than 5 are there?",
      "questionVn": "Có bao nhiêu số có 3 chữ số mà chữ số hàng đơn vị nhỏ hơn 5?",
      "imageUrl": "/images/timo/grade2/test4/q14.png",
      "options": [
        "A. 14",
        "B. 50",
        "C. 450",
        "D. 45"
      ],
      "correctAnswer": "A. 14"
    },
    {
      "id": 15,
      "category": "Number theory",
      "questionEn": "Fill the lines with ‘ + ’ and ‘’ to make the equation below correct.",
      "questionVn": "Điền vào dòng kẻ với ‘+’ và ‘×’ để tạo thành một phép tính đúng. 1   1   4   4   5 = 23",
      "imageUrl": "/images/timo/grade2/test4/q15.png",
      "options": [
        "A. 1 1 4 4"
      ],
      "correctAnswer": "A. 1 1 4 4"
    },
    {
      "id": 16,
      "category": "Geometry",
      "questionEn": "How many squares are there in the figure below?",
      "questionVn": "Có bao nhiêu hình vuông trong hình dưới đây?",
      "imageUrl": "/images/timo/grade2/test4/q16.png",
      "options": [
        "A. 10",
        "B. 11",
        "C. 12",
        "D. 13"
      ],
      "correctAnswer": "A. 10"
    },
    {
      "id": 17,
      "category": "Geometry",
      "questionEn": "How many vertices do two distinct triangles have?",
      "questionVn": "Hai tam giác phân biệt có bao nhiêu đỉnh?",
      "imageUrl": "/images/timo/grade2/test4/q17.png",
      "options": [
        "A. 4",
        "B. 8",
        "C. 3",
        "D. 6"
      ],
      "correctAnswer": "A. 4"
    },
    {
      "id": 18,
      "category": "Geometry",
      "questionEn": "By observing the pattern, what is the missing figure?",
      "questionVn": "Bằng cách quan sát quy luật, hình còn thiếu là hình gì? ■ 、▲ 、★ 、●、■ 、▲ 、★ 、●、■ 、？、★ 、●",
      "imageUrl": "/images/timo/grade2/test4/q18.png",
      "options": [
        "A. ★",
        "B. ▲",
        "C. ■",
        "D. ●"
      ],
      "correctAnswer": "A. ★"
    },
    {
      "id": 19,
      "category": "Geometry",
      "questionEn": "At least how many squares can be seen if viewing the figure below from the top?",
      "questionVn": "Có ít nhất bao nhiêu hình vuông có thể nhìn được nếu nhìn hình ở dưới từ phía trên?",
      "imageUrl": "/images/timo/grade2/test4/q19.png",
      "options": [
        "A. 6",
        "B. 7",
        "C. 8",
        "D. 9"
      ],
      "correctAnswer": "A. 6"
    },
    {
      "id": 20,
      "category": "Geometry",
      "questionEn": "At most how many lines can be formed by using 6 points on a plane?",
      "questionVn": "Có nhiều nhất bao nhiêu đường thẳng được tạo bởi 6 điểm trên một mặt phẳng?",
      "imageUrl": "/images/timo/grade2/test4/q20.png",
      "options": [
        "A. 15",
        "B. 14",
        "C. 13",
        "D. 12"
      ],
      "correctAnswer": "A. 15"
    },
    {
      "id": 21,
      "category": "Combinatorics",
      "questionEn": "After Alice gives 8 pencils to Peter and takes 6 pencils from Mary, they will have equal number of pencils. How many pencils did Mary have more than Peter originally?",
      "questionVn": "Sau khi Alice cho Peter 8 cái bút chì và lấy của Mary 6 cái bút chì, thì họ có số bút chì bằng nhau. Hỏi lúc đầu Mary có nhiều hơn Peter bao nhiêu cái bút chì?",
      "imageUrl": "/images/timo/grade2/test4/q21.png",
      "options": [
        "A. 14",
        "B. 13",
        "C. 12",
        "D. 11"
      ],
      "correctAnswer": "A. 14"
    },
    {
      "id": 22,
      "category": "Combinatorics",
      "questionEn": "What is the greatest 4-digit number by using 2, 4, 6 and 8? (Each digit can only be used once).",
      "questionVn": "Số lớn nhất có 4 chữ số tạo bởi các chữ số 2, 4, 6 và 8? (Mỗi chữ số chỉ được dùng một lần).",
      "imageUrl": "/images/timo/grade2/test4/q22.png",
      "options": [
        "A. 8642",
        "B. 8624",
        "C. 6824",
        "D. 8462"
      ],
      "correctAnswer": "A. 8642"
    },
    {
      "id": 23,
      "category": "Combinatorics",
      "questionEn": "Pick 2 from 10 children to take part in interview. How many different ways are there?",
      "questionVn": "Chọn 2 trong 19 đứa trẻ để tham gia một cuộc phỏng vấn. Hỏi có bao nhiêu cách chọn khác nhau?",
      "imageUrl": "/images/timo/grade2/test4/q23.png",
      "options": [
        "A. 40",
        "B. 35",
        "C. 45",
        "D. 50"
      ],
      "correctAnswer": "A. 40"
    },
    {
      "id": 24,
      "category": "Combinatorics",
      "questionEn": "How many odd numbers are there from the 4th to the 18th number?",
      "questionVn": "Có bao nhiêu số lẻ trong các số dưới đây tính từ số thứ 4 đến số thứ 18? , 2, 3, 5, 8, 3,<",
      "imageUrl": "/images/timo/grade2/test4/q24.png",
      "options": [
        "A. 11",
        "B. 12",
        "C. 10",
        "D. 13"
      ],
      "correctAnswer": "A. 11"
    },
    {
      "id": 25,
      "category": "Combinatorics",
      "questionEn": "Alice has 5 $1 coins, 4 $2 coins and 5 $5 coins, how many values of a product can she buy without any changes?",
      "questionVn": "Alice có 5 đồng $1, 4 đồng $2 và 5 đồng $5, hỏi có bao nhiêu giá trị của một món hàng cô ấy có thể mua mà không có tiền thừa trả lại?",
      "imageUrl": "/images/timo/grade2/test4/q25.png",
      "options": [
        "A. 34",
        "B. 35",
        "C. 37",
        "D. 38"
      ],
      "correctAnswer": "A. 34"
    }
  ],
  [
    {
      "id": 1,
      "category": "Logical thinking",
      "questionEn": "If today is Saturday, which day of the week will 4 days later be?",
      "questionVn": "Nếu hôm nay là thứ Bảy, hỏi 4 ngày sau là thứ mấy trong tuần?",
      "imageUrl": "/images/timo/grade2/test5/q1.png",
      "options": [
        "A. Monday (Thứ Hai)",
        "B. Tuesday (Thứ Ba)",
        "C. Wednesday (Thứ Tư)",
        "D. Thursday (Thứ Năm)"
      ],
      "correctAnswer": "A. Monday (Thứ Hai)"
    },
    {
      "id": 2,
      "category": "Logical thinking",
      "questionEn": "According to the pattern shown below, what is the number in the blank?",
      "questionVn": "Dựa vào quy luật dưới đây, số ở chỗ trống là số nào? 2 、 6 、 10 、 14 、 18 、 22 、",
      "imageUrl": "/images/timo/grade2/test5/q2.png",
      "options": [
        "A. 26",
        "B. 24",
        "C. 27",
        "D. 28"
      ],
      "correctAnswer": "A. 26"
    },
    {
      "id": 3,
      "category": "Logical thinking",
      "questionEn": "Class 2A has 34 students queuing up in a row. If there are 9 students behind Amy, how many students are in front of Amy?",
      "questionVn": "Lớp 2A có 34 học sinh xếp thành một hàng. Nếu có 9 học sinh phía sau Amy, hỏi có bao nhiêu học sinh đứng trước Amy?",
      "imageUrl": "/images/timo/grade2/test5/q3.png",
      "options": [
        "A. 25",
        "B. 24",
        "C. 23",
        "D. 22"
      ],
      "correctAnswer": "A. 25"
    },
    {
      "id": 4,
      "category": "Logical thinking",
      "questionEn": "From the pattern shown below, how many  more than # is / are there in the 15th group?",
      "questionVn": "Dựa vào quy luật dưới đây,  nhiều hơn # bao nhiêu hình trong nhóm thứ 15?",
      "imageUrl": "/images/timo/grade2/test5/q4.png",
      "options": [
        "A. 0",
        "B. 1",
        "C. 2",
        "D. 3"
      ],
      "correctAnswer": "A. 0"
    },
    {
      "id": 5,
      "category": "Logical thinking",
      "questionEn": "3 years ago, Amy was 14 years old. How old is Amy now?",
      "questionVn": "3 năm trước, Amy 14 tuổi. Hỏi Amy hiện tại bao nhiêu tuổi?",
      "imageUrl": "/images/timo/grade2/test5/q5.png",
      "options": [
        "A. 11",
        "B. 14",
        "C. 13",
        "D. 17"
      ],
      "correctAnswer": "A. 11"
    },
    {
      "id": 6,
      "category": "Arithmetic",
      "questionEn": "Find the value of 7 +17 + 27 + 37 + 47 + 3 +3 + 3 + 3 + 3 .",
      "questionVn": "Tìm giá trị của 7 +17 + 27 + 37 + 47 + 3 +3 + 3 + 3 + 3 .",
      "imageUrl": "/images/timo/grade2/test5/q6.png",
      "options": [
        "A. 130",
        "B. 135",
        "C. 140",
        "D. 150"
      ],
      "correctAnswer": "A. 130"
    },
    {
      "id": 7,
      "category": "Arithmetic",
      "questionEn": "Find the value of 15 : 3 + 25 : 5 – 30 : 5 .",
      "questionVn": "Tìm giá trị của 15 : 3 + 25 : 5 – 30 :5 .",
      "imageUrl": "/images/timo/grade2/test5/q7.png",
      "options": [
        "A. 3",
        "B. 4",
        "C. 5",
        "D. 6"
      ],
      "correctAnswer": "A. 3"
    },
    {
      "id": 8,
      "category": "Arithmetic",
      "questionEn": "Find the value of 1 – 2 + 3 – 4 + 5 – 6 + 7 – 8 + 9.",
      "questionVn": "Tìm giá trị của 1 – 2 + 3 – 4 + 5 – 6 + 7 – 8 + 9.",
      "imageUrl": "/images/timo/grade2/test5/q8.png",
      "options": [
        "A. 3",
        "B. 7",
        "C. 5",
        "D. 9"
      ],
      "correctAnswer": "A. 3"
    },
    {
      "id": 9,
      "category": "Arithmetic",
      "questionEn": "What is the number should be filled in the blank if the equation is correct?",
      "questionVn": "Số nên điền vào chỗ trống nếu phép tính dưới đây đúng là số nào? : 6 = 12",
      "imageUrl": "/images/timo/grade2/test5/q9.png",
      "options": [
        "A. 2",
        "B. 6",
        "C. 72",
        "D. 32"
      ],
      "correctAnswer": "A. 2"
    },
    {
      "id": 10,
      "category": "Arithmetic",
      "questionEn": "Find the value of 10 x 1 + 10 x 2 + 10 x 3 + 10 x 4.",
      "questionVn": "Tìm giá trị của 10 x 1 + 10 x 2 + 10 x 3 + 10 x 4.",
      "imageUrl": "/images/timo/grade2/test5/q10.png",
      "options": [
        "A. 80",
        "B. 90",
        "C. 100",
        "D. 110"
      ],
      "correctAnswer": "A. 80"
    },
    {
      "id": 11,
      "category": "Number theory",
      "questionEn": "Amy has 23 apples and John has 11 apples. How many apples does John have to ask Amy to give him so that Amy has 2 more apples than John?",
      "questionVn": "Amy có 23 quả táo và John có 11 quả táo. Hỏi John cần xin Amy đưa cho bạn ấy bao nhiêu quả táo để Amy có nhiều hơn John 2 quả táo?",
      "imageUrl": "/images/timo/grade2/test5/q11.png",
      "options": [
        "A. 5",
        "B. 4",
        "C. 3",
        "D. 2"
      ],
      "correctAnswer": "A. 5"
    },
    {
      "id": 12,
      "category": "Number theory",
      "questionEn": "The numbers below follow the arithmetic sequence, what is the 20 th number?",
      "questionVn": "Các số dưới đây là một dãy số cách đều, số thứ 20 là số nào? 101、103、105、107、109、<",
      "imageUrl": "/images/timo/grade2/test5/q12.png",
      "options": [
        "A. 138",
        "B. 139",
        "C. 140",
        "D. 141"
      ],
      "correctAnswer": "A. 138"
    },
    {
      "id": 13,
      "category": "Number theory",
      "questionEn": "How many 2-digit numbers having the tens digit that is smaller than 3 are there?",
      "questionVn": "Có bao nhiêu số có 2 chữ số có chữ số hàng chục nhỏ hơn 3?",
      "imageUrl": "/images/timo/grade2/test5/q13.png",
      "options": [
        "A. 19",
        "B. 20",
        "C. 21",
        "D. 18"
      ],
      "correctAnswer": "A. 19"
    },
    {
      "id": 14,
      "category": "Number theory",
      "questionEn": "Fill the lines with ‘ + ‘ and ‘– ’ to make the equation below correct.",
      "questionVn": "Điền vào dòng kẻ với ‘+’ và ‘–’ để tạo thành một phép tính đúng. 1____3____5____7____11 = 11",
      "imageUrl": "/images/timo/grade2/test5/q14.png",
      "options": [
        "A. 1 3 5"
      ],
      "correctAnswer": "A. 1 3 5"
    },
    {
      "id": 15,
      "category": "Number theory",
      "questionEn": "Determine the result of 1+ 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 +10 +11+12 +13 +14 is odd or even?",
      "questionVn": "Hãy xác định kết quả của 1+ 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 +10 +11+12 +13 +14 là lẻ hay chẵn.",
      "imageUrl": "/images/timo/grade2/test5/q15.png",
      "options": [
        "A. Odd (Số lẻ)",
        "B. Even (Số chẵn)",
        "C. Both odd and even (Vừa chẵn vừa lẻ)",
        "D. Neither odd nor even (Không chẵn không lẻ)"
      ],
      "correctAnswer": "A. Odd (Số lẻ)"
    },
    {
      "id": 16,
      "category": "Geometry",
      "questionEn": "How many squares are there in the figure below?",
      "questionVn": "Có bao nhiêu hình vuông trong hình dưới đây?",
      "imageUrl": "/images/timo/grade2/test5/q16.png",
      "options": [
        "A. 9",
        "B. 10",
        "C. 11",
        "D. 12"
      ],
      "correctAnswer": "A. 9"
    },
    {
      "id": 17,
      "category": "Geometry",
      "questionEn": "How many sides does a circle have?",
      "questionVn": "Một hình tròn có bao nhiêu cạnh?",
      "imageUrl": "/images/timo/grade2/test5/q17.png",
      "options": [
        "A. 0",
        "B. 1",
        "C. 2",
        "D. 3"
      ],
      "correctAnswer": "A. 0"
    },
    {
      "id": 18,
      "category": "Geometry",
      "questionEn": "According to the pattern shown below, what is the figure in the space (‚?‛) provided?",
      "questionVn": "Dựa vào quy luật dưới đây, hình điền vào dấu ‚?‛ là hình gì? △ □ ○ ◊ △ △ □ ○ ◊ △△ ? ○ <",
      "imageUrl": "/images/timo/grade2/test5/q18.png",
      "options": [
        "A. △",
        "B. ◊",
        "C. ○",
        "D. □"
      ],
      "correctAnswer": "A. △"
    },
    {
      "id": 19,
      "category": "Geometry",
      "questionEn": "At least how many squares can be seen if viewing the figure below from the side?",
      "questionVn": "Có ít nhất bao nhiêu hình vuông có thể nhìn thấy được nếu nhìn từ phía bên cạnh?",
      "imageUrl": "/images/timo/grade2/test5/q19.png",
      "options": [
        "A. 2",
        "B. 3",
        "C. 4",
        "D. 5"
      ],
      "correctAnswer": "A. 2"
    },
    {
      "id": 20,
      "category": "Geometry",
      "questionEn": "At most how many lines can be formed by using 5 points on a plane?",
      "questionVn": "Có nhiều nhất bao nhiêu đường thẳng được tạo bởi 5 điểm trên một mặt phẳng?",
      "imageUrl": "/images/timo/grade2/test5/q20.png",
      "options": [
        "A. 6",
        "B. 8",
        "C. 9",
        "D. 10"
      ],
      "correctAnswer": "A. 6"
    },
    {
      "id": 21,
      "category": "Combinatorics",
      "questionEn": "A restaurant has 2 types of appetizers, 3 types of main courses and 3 types of desserts. How many ways can a customer order an appetizer, a main course and a dessert?",
      "questionVn": "Một nhà hàng có 2 món khai vị, 3 món chính và 3 món tráng miệng. Hỏi có bao nhiêu cách một khách hàng có thể gọi 1 món khai vị, 1 món chính và 1 món tráng miệng?",
      "imageUrl": "/images/timo/grade2/test5/q21.png",
      "options": [
        "A. 18",
        "B. 6",
        "C. 9",
        "D. 8"
      ],
      "correctAnswer": "A. 18"
    },
    {
      "id": 22,
      "category": "Combinatorics",
      "questionEn": "What is the smallest 4-digit number by using 3, 9, 4 and 0 that is divisible by 10? (Each digit can only be used once).",
      "questionVn": "Số nhỏ nhất có 4 chữ số tạo bởi các chữ số 3, 9, 4 và 0 mà chia hết cho 10 là số nào? (Mỗi chữ số chỉ dùng một lần).",
      "imageUrl": "/images/timo/grade2/test5/q22.png",
      "options": [
        "A. 3094",
        "B. 3049",
        "C. 3940",
        "D. 3490"
      ],
      "correctAnswer": "A. 3094"
    },
    {
      "id": 23,
      "category": "Combinatorics",
      "questionEn": "How many odd numbers are there in the first 30 numbers of the sequence?",
      "questionVn": "Có bao nhiêu số lẻ trong 30 số đầu tiên ở dãy dưới đây? 2, 5, 8,  , 4, 7, <",
      "imageUrl": "/images/timo/grade2/test5/q23.png",
      "options": [
        "A. 13",
        "B. 14",
        "C. 15",
        "D. 16"
      ],
      "correctAnswer": "A. 13"
    },
    {
      "id": 24,
      "category": "Combinatorics",
      "questionEn": "Pick 2 from 6 children to take part in mathematics competition. How many different combinations are there?",
      "questionVn": "Chọn 2 trong 6 đứa trẻ để tham gia một cuộc thi toán. Hỏi có bao nhiêu cách chọn khác nhau?",
      "imageUrl": "/images/timo/grade2/test5/q24.png",
      "options": [
        "A. 15",
        "B. 17",
        "C. 18",
        "D. 20"
      ],
      "correctAnswer": "A. 15"
    },
    {
      "id": 25,
      "category": "Combinatorics",
      "questionEn": "How many numbers contain the digit ‚0‛ from  to 101?",
      "questionVn": "Có bao nhiêu số có chứa chữ số 0 từ số 1 đển 101?",
      "imageUrl": "/images/timo/grade2/test5/q25.png",
      "options": [
        "A. 8",
        "B. 9",
        "C. 10",
        "D. 11"
      ],
      "correctAnswer": "A. 8"
    }
  ]
],
    heat: [
  [
    {
      "id": 1,
      "category": "Logical thinking",
      "questionEn": "According to the pattern below, what is the English letter in the space?",
      "questionVn": "Pattern: Quy luật; English letter: Chữ cái Tiếng Anh; Space: Chỗ trống. B、D、G 、 I 、 L 、 N 、 __",
      "imageUrl": "/images/timo/grade2/final1/q1.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final1/q1_A.png",
        "/images/timo/grade2/final1/q1_B.png",
        "/images/timo/grade2/final1/q1_C.png",
        "/images/timo/grade2/final1/q1_D.png"
      ]
    },
    {
      "id": 2,
      "category": "Logical thinking",
      "questionEn": "23 children form a column. There are 8 children behind Alice. How many child(ren) is / are in front of her?",
      "questionVn": "Column: Hàng dọc; Behind: Đằng sau; In front of: Đằng trước.",
      "imageUrl": "/images/timo/grade2/final1/q2.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final1/q2_A.png",
        "/images/timo/grade2/final1/q2_B.png",
        "/images/timo/grade2/final1/q2_C.png",
        "/images/timo/grade2/final1/q2_D.png"
      ]
    },
    {
      "id": 3,
      "category": "Logical thinking",
      "questionEn": "When Edward was born, mum was 27 years old. Brother was born 1 year later. When mum is 46 years old, how old will brother be?",
      "questionVn": "Born: Sinh ra; Year old: Tuổi; Later: Sau.",
      "imageUrl": "/images/timo/grade2/final1/q3.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final1/q3_A.png",
        "/images/timo/grade2/final1/q3_B.png",
        "/images/timo/grade2/final1/q3_C.png",
        "/images/timo/grade2/final1/q3_D.png"
      ]
    },
    {
      "id": 4,
      "category": "Logical thinking",
      "questionEn": "What is the value of the number to represent ‚?‛ in the following table?",
      "questionVn": "Value: Giá trị; Represent: Biểu diễn; Table: Bảng.",
      "imageUrl": "/images/timo/grade2/final1/q4.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final1/q4_A.png",
        "/images/timo/grade2/final1/q4_B.png",
        "/images/timo/grade2/final1/q4_C.png",
        "/images/timo/grade2/final1/q4_D.png"
      ]
    },
    {
      "id": 5,
      "category": "Logical thinking",
      "questionEn": "According to the pattern below, how many ＃ is / are there in the 6th Group?",
      "questionVn": "Pattern: Quy luật; 6th group: Nhóm thứ 6.  34 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com Arithmetic / Số học",
      "imageUrl": "/images/timo/grade2/final1/q5.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final1/q5_A.png",
        "/images/timo/grade2/final1/q5_B.png",
        "/images/timo/grade2/final1/q5_C.png",
        "/images/timo/grade2/final1/q5_D.png"
      ]
    },
    {
      "id": 6,
      "category": "Logical thinking",
      "questionEn": "Find the value of 28 11 23 39 32 17      .",
      "questionVn": "Value: Giá trị.",
      "imageUrl": "/images/timo/grade2/final1/q6.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final1/q6_A.png",
        "/images/timo/grade2/final1/q6_B.png",
        "/images/timo/grade2/final1/q6_C.png",
        "/images/timo/grade2/final1/q6_D.png"
      ]
    },
    {
      "id": 7,
      "category": "Logical thinking",
      "questionEn": "Find the value of 6 23 6 38 6 56 6 18     .",
      "questionVn": "Value: Giá trị.",
      "imageUrl": "/images/timo/grade2/final1/q7.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final1/q7_A.png",
        "/images/timo/grade2/final1/q7_B.png",
        "/images/timo/grade2/final1/q7_C.png",
        "/images/timo/grade2/final1/q7_D.png"
      ]
    },
    {
      "id": 8,
      "category": "Logical thinking",
      "questionEn": "Find the value of 11 13 15 17 19 21 23 25        .",
      "questionVn": "Value: Giá trị.",
      "imageUrl": "/images/timo/grade2/final1/q8.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final1/q8_A.png",
        "/images/timo/grade2/final1/q8_B.png",
        "/images/timo/grade2/final1/q8_C.png",
        "/images/timo/grade2/final1/q8_D.png"
      ]
    },
    {
      "id": 9,
      "category": "Logical thinking",
      "questionEn": "Find the value of 12 5 9 5 17 5 3 5  .",
      "questionVn": "Value: Giá trị.",
      "imageUrl": "/images/timo/grade2/final1/q9.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final1/q9_A.png",
        "/images/timo/grade2/final1/q9_B.png",
        "/images/timo/grade2/final1/q9_C.png",
        "/images/timo/grade2/final1/q9_D.png"
      ]
    },
    {
      "id": 10,
      "category": "Logical thinking",
      "questionEn": "Find the value of 12 5 5 15 2  .",
      "questionVn": "Value: Giá trị. Number Theory / Lý thuyết số",
      "imageUrl": "/images/timo/grade2/final1/q10.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final1/q10_A.png",
        "/images/timo/grade2/final1/q10_B.png",
        "/images/timo/grade2/final1/q10_C.png",
        "/images/timo/grade2/final1/q10_D.png"
      ]
    },
    {
      "id": 11,
      "category": "Logical thinking",
      "questionEn": "The numbers below follow the arithmetic sequence, what is the sum of the 6th number and the 9th number?",
      "questionVn": "Arithmetic sequence: Dãy số cách đều; Sum: Tổng; 6th number: Số thứ 6; 9th number: Số thứ 9. 99、92、85、78、71、<",
      "imageUrl": "/images/timo/grade2/final1/q11.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final1/q11_A.png",
        "/images/timo/grade2/final1/q11_B.png",
        "/images/timo/grade2/final1/q11_C.png",
        "/images/timo/grade2/final1/q11_D.png"
      ]
    },
    {
      "id": 12,
      "category": "Logical thinking",
      "questionEn": "Fill the lines with ‘ + ’ and ‘ – ’ to make the equation below correct. (Write down the complete equation on the answer sheet).",
      "questionVn": "Lines: Dòng kẻ; Equation: Phép tính; Correct; Đúng. (Lưu ý viết toàn bộ phép tính vào phiếu trả lời). 23   7   11   3 = 22",
      "imageUrl": "/images/timo/grade2/final1/q12.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final1/q12_A.png",
        "/images/timo/grade2/final1/q12_B.png",
        "/images/timo/grade2/final1/q12_C.png",
        "/images/timo/grade2/final1/q12_D.png"
      ]
    },
    {
      "id": 13,
      "category": "Logical thinking",
      "questionEn": "Determine the result of 7 8 8 9 9 10 1 1 2 2 3 3   is odd or even.",
      "questionVn": "Determine the result: Xác định kết quả; Odd:Lẻ; Even: Chẵn.",
      "imageUrl": "/images/timo/grade2/final1/q13.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final1/q13_A.png",
        "/images/timo/grade2/final1/q13_B.png",
        "/images/timo/grade2/final1/q13_C.png",
        "/images/timo/grade2/final1/q13_D.png"
      ]
    },
    {
      "id": 14,
      "category": "Logical thinking",
      "questionEn": "What is the smallest 3-digit number that can be divisible by 7 and 4?",
      "questionVn": "The smallest 3-digit number: Số nhỏ nhất có 3 chữ số; Divisible by: Chia hết cho.",
      "imageUrl": "/images/timo/grade2/final1/q14.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final1/q14_A.png",
        "/images/timo/grade2/final1/q14_B.png",
        "/images/timo/grade2/final1/q14_C.png",
        "/images/timo/grade2/final1/q14_D.png"
      ]
    },
    {
      "id": 15,
      "category": "Logical thinking",
      "questionEn": "If A, B and C are 1-digit numbers, find the value of B C  .",
      "questionVn": "1-digit numbers: Các số có 1 chữ số; Value: Giá trị.  B A  C B  6 2  35 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com Geometry / Hình học",
      "imageUrl": "/images/timo/grade2/final1/q15.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final1/q15_A.png",
        "/images/timo/grade2/final1/q15_B.png",
        "/images/timo/grade2/final1/q15_C.png",
        "/images/timo/grade2/final1/q15_D.png"
      ]
    },
    {
      "id": 16,
      "category": "Logical thinking",
      "questionEn": "How many line segments are there in the figure below?",
      "questionVn": "Line segment: Đoạn thẳng; Figure: Hình vẽ.",
      "imageUrl": "/images/timo/grade2/final1/q16.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final1/q16_A.png",
        "/images/timo/grade2/final1/q16_B.png",
        "/images/timo/grade2/final1/q16_C.png",
        "/images/timo/grade2/final1/q16_D.png"
      ]
    },
    {
      "id": 17,
      "category": "Logical thinking",
      "questionEn": "A prism has 27 edges, how many faces does this prism have?",
      "questionVn": "Prism: Hình lăng trụ; Edge: Cạnh; Face: Mặt.",
      "imageUrl": "/images/timo/grade2/final1/q17.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final1/q17_A.png",
        "/images/timo/grade2/final1/q17_B.png",
        "/images/timo/grade2/final1/q17_C.png",
        "/images/timo/grade2/final1/q17_D.png"
      ]
    },
    {
      "id": 18,
      "category": "Logical thinking",
      "questionEn": "How many square(s) is / are there in the figure below?",
      "questionVn": "Square: Hình vuông; Figure: Hình vẽ.",
      "imageUrl": "/images/timo/grade2/final1/q18.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final1/q18_A.png",
        "/images/timo/grade2/final1/q18_B.png",
        "/images/timo/grade2/final1/q18_C.png",
        "/images/timo/grade2/final1/q18_D.png"
      ]
    },
    {
      "id": 19,
      "category": "Logical thinking",
      "questionEn": "At least how many squares can be seen if viewing the figure below from top?",
      "questionVn": "At least: Ít nhất; Square: Hình vuông; Figure: Hình vẽ; From top: Từ phía trên.",
      "imageUrl": "/images/timo/grade2/final1/q19.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final1/q19_A.png",
        "/images/timo/grade2/final1/q19_B.png",
        "/images/timo/grade2/final1/q19_C.png",
        "/images/timo/grade2/final1/q19_D.png"
      ]
    },
    {
      "id": 20,
      "category": "Logical thinking",
      "questionEn": "At most how many different triangle(s) can be formed by having 4 straight lines cut a circle?",
      "questionVn": "At most: Nhiều nhất; Different triangles: Các hình tam giác khác nhau; Formed: Được tạo ra; Straight lines: Đường thẳng; Cut: Cắt; Circle: Hình tròn. Combinatorics / Tổ hợp",
      "imageUrl": "/images/timo/grade2/final1/q20.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final1/q20_A.png",
        "/images/timo/grade2/final1/q20_B.png",
        "/images/timo/grade2/final1/q20_C.png",
        "/images/timo/grade2/final1/q20_D.png"
      ]
    },
    {
      "id": 21,
      "category": "Logical thinking",
      "questionEn": "How many 3-digit number(s) having the unit digit that is larger than the hundreds digit is / are there?",
      "questionVn": "3-digit numbers: Số có 3 chữ số; Unit digit: Chữ số hàng đơn vị; Larger than: Lớn hơn; Hundreds digit: Chữ số hàng trăm.  36 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com",
      "imageUrl": "/images/timo/grade2/final1/q21.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final1/q21_A.png",
        "/images/timo/grade2/final1/q21_B.png",
        "/images/timo/grade2/final1/q21_C.png",
        "/images/timo/grade2/final1/q21_D.png"
      ]
    },
    {
      "id": 22,
      "category": "Logical thinking",
      "questionEn": "According to the following answers, how many 2-digit numbers are there?",
      "questionVn": "Answers: Kết quả phép tính; 2-digit numbers: Số có 2 chữ số. 2 4 , 42 7  , 36 3 , 7 2 , 9 9 , 39 3 , 72 9 ",
      "imageUrl": "/images/timo/grade2/final1/q22.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final1/q22_A.png",
        "/images/timo/grade2/final1/q22_B.png",
        "/images/timo/grade2/final1/q22_C.png",
        "/images/timo/grade2/final1/q22_D.png"
      ]
    },
    {
      "id": 23,
      "category": "Logical thinking",
      "questionEn": "What is the greatest 4-digit odd number by using 0, 2, 4, 6 and 9? (Each digit can only be used once).",
      "questionVn": "The greatest 4-digit odd number: Số lẻ lớn nhất có 4 chữ số; Each digit can only be used once: Mỗi chữ số chỉ được dùng một lần.",
      "imageUrl": "/images/timo/grade2/final1/q23.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final1/q23_A.png",
        "/images/timo/grade2/final1/q23_B.png",
        "/images/timo/grade2/final1/q23_C.png",
        "/images/timo/grade2/final1/q23_D.png"
      ]
    },
    {
      "id": 24,
      "category": "Logical thinking",
      "questionEn": "There are 4 different flavors of ice-cream. Now mixing 3 types to make a 3-ball ice-cream. How many different type(s) of ice-cream is / are there? (Strawberry - vanilla - chocolate will be counted the same as strawberry - chocolate - vanilla).",
      "questionVn": "Different flavors: Các vị khác nhau; Mixing: Kết hợp; Different types of ice-creams: Các loại kem khác nhau; Counted the same: Được tính là giống nhau",
      "imageUrl": "/images/timo/grade2/final1/q24.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final1/q24_A.png",
        "/images/timo/grade2/final1/q24_B.png",
        "/images/timo/grade2/final1/q24_C.png",
        "/images/timo/grade2/final1/q24_D.png"
      ]
    },
    {
      "id": 25,
      "category": "Logical thinking",
      "questionEn": "Choose 4 digits, without repetition, from 0, 1, 4, 5, 6 and 7 to form two 2-digit even numbers. What is the minimum value of the difference?",
      "questionVn": "Digits: Chữ số; Without repetition: Không lặp lại; 2-digit even number: Số chẵn có 2 chữ số; Minimum value of the difference: Hiệu nhỏ nhất.   37 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com",
      "imageUrl": "/images/timo/grade2/final1/q25.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final1/q25_A.png",
        "/images/timo/grade2/final1/q25_B.png",
        "/images/timo/grade2/final1/q25_C.png",
        "/images/timo/grade2/final1/q25_D.png"
      ]
    }
  ],
  [
    {
      "id": 1,
      "category": "Logical thinking",
      "questionEn": "Alice wrote a 2-digit number on a piece of paper and asked Bobby to guess it. Bobby asked: ‚Is the number 68?‛ Alice replied: ‚One of the digits is correct, the position of that digit is wrong.‛ Bobby asked again: ‚Is the number 7?‛ Alice replied: ‚One of the digits is correct, the position of that digit is wrong.‛ Bobby asked again: ‚Is the number 79?‛ Alice said: ‚One of the digits is correct, the position of that digit is correct.‛ What is the number written by Alice?",
      "questionVn": "2-digit number: Số có 2 chữ số; Digit: Chữ số; Number: Số; The position of that digit: Vị trí của chữ số đó; Correct: Đúng; Wrong: Sai.",
      "imageUrl": "/images/timo/grade2/final2/q1.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final2/q1_A.png",
        "/images/timo/grade2/final2/q1_B.png",
        "/images/timo/grade2/final2/q1_C.png",
        "/images/timo/grade2/final2/q1_D.png"
      ]
    },
    {
      "id": 2,
      "category": "Logical thinking",
      "questionEn": "When Bruce was born, mum was 29 years old. When Bruce will be 28 years old, how old will mum be?",
      "questionVn": "Born: Sinh ra; Years old: Tuổi.",
      "imageUrl": "/images/timo/grade2/final2/q2.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final2/q2_A.png",
        "/images/timo/grade2/final2/q2_B.png",
        "/images/timo/grade2/final2/q2_C.png",
        "/images/timo/grade2/final2/q2_D.png"
      ]
    },
    {
      "id": 3,
      "category": "Logical thinking",
      "questionEn": "According to the pattern shown below, what is the number in the blank?",
      "questionVn": "Pattern: Quy luật; Number: Số; Blank: Chỗ trống. 12 、 15 、 21 、 30 、 42 、 57 、 __",
      "imageUrl": "/images/timo/grade2/final2/q3.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final2/q3_A.png",
        "/images/timo/grade2/final2/q3_B.png",
        "/images/timo/grade2/final2/q3_C.png",
        "/images/timo/grade2/final2/q3_D.png"
      ]
    },
    {
      "id": 4,
      "category": "Logical thinking",
      "questionEn": "According to the pattern below, what is the English letter in the space?",
      "questionVn": "Pattern: Quy luật; English letter: Chữ cái Tiếng Anh; Space: Chỗ trống. P 、 M 、 J 、 G 、 __",
      "imageUrl": "/images/timo/grade2/final2/q4.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final2/q4_A.png",
        "/images/timo/grade2/final2/q4_B.png",
        "/images/timo/grade2/final2/q4_C.png",
        "/images/timo/grade2/final2/q4_D.png"
      ]
    },
    {
      "id": 5,
      "category": "Logical thinking",
      "questionEn": "According to the pattern below, how many ※ is / are there in the 7th Group?",
      "questionVn": "Pattern: Quy luật; 7th Group: Nhóm thứ 7.         38 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com Arithmetic / Số học",
      "imageUrl": "/images/timo/grade2/final2/q5.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final2/q5_A.png",
        "/images/timo/grade2/final2/q5_B.png",
        "/images/timo/grade2/final2/q5_C.png",
        "/images/timo/grade2/final2/q5_D.png"
      ]
    },
    {
      "id": 6,
      "category": "Logical thinking",
      "questionEn": "Find the value of 37 13 68 13 51     .",
      "questionVn": "Value: Giá trị.",
      "imageUrl": "/images/timo/grade2/final2/q6.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final2/q6_A.png",
        "/images/timo/grade2/final2/q6_B.png",
        "/images/timo/grade2/final2/q6_C.png",
        "/images/timo/grade2/final2/q6_D.png"
      ]
    },
    {
      "id": 7,
      "category": "Logical thinking",
      "questionEn": "Find the value of 24 62 16 29 8    .",
      "questionVn": "Value: Giá trị.",
      "imageUrl": "/images/timo/grade2/final2/q7.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final2/q7_A.png",
        "/images/timo/grade2/final2/q7_B.png",
        "/images/timo/grade2/final2/q7_C.png",
        "/images/timo/grade2/final2/q7_D.png"
      ]
    },
    {
      "id": 8,
      "category": "Logical thinking",
      "questionEn": "Find the value of 1 113 2 113 3 113 4 113     .",
      "questionVn": "Value: Giá trị.",
      "imageUrl": "/images/timo/grade2/final2/q8.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final2/q8_A.png",
        "/images/timo/grade2/final2/q8_B.png",
        "/images/timo/grade2/final2/q8_C.png",
        "/images/timo/grade2/final2/q8_D.png"
      ]
    },
    {
      "id": 9,
      "category": "Logical thinking",
      "questionEn": "If A and B are both 1-digit number, find the value of B .",
      "questionVn": "1-digit number: Số có 1 chữ số; Value: Giá trị. A A  A B 7 2",
      "imageUrl": "/images/timo/grade2/final2/q9.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final2/q9_A.png",
        "/images/timo/grade2/final2/q9_B.png",
        "/images/timo/grade2/final2/q9_C.png",
        "/images/timo/grade2/final2/q9_D.png"
      ]
    },
    {
      "id": 10,
      "category": "Logical thinking",
      "questionEn": "What is the number in the blank if the equation below is correct?",
      "questionVn": "Number: Số; Blank: Chỗ trống; Equation: Phép tính; Correct: Đúng. _____ 2 9 19   Number Theory / Lý thuyết số",
      "imageUrl": "/images/timo/grade2/final2/q10.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final2/q10_A.png",
        "/images/timo/grade2/final2/q10_B.png",
        "/images/timo/grade2/final2/q10_C.png",
        "/images/timo/grade2/final2/q10_D.png"
      ]
    },
    {
      "id": 11,
      "category": "Logical thinking",
      "questionEn": "How many 2-digit even number(s) that is / are multiples of 3 is / are there?",
      "questionVn": "2-digit even number: Số chẵn có 2 chữ số; Multiple of 3: Bội của 3.",
      "imageUrl": "/images/timo/grade2/final2/q11.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final2/q11_A.png",
        "/images/timo/grade2/final2/q11_B.png",
        "/images/timo/grade2/final2/q11_C.png",
        "/images/timo/grade2/final2/q11_D.png"
      ]
    },
    {
      "id": 12,
      "category": "Logical thinking",
      "questionEn": "Fill the lines with ‘ + ’ and ‘ – ’ to make the equation below correct. (Write down the complete equation on the answer sheet).",
      "questionVn": "Line: Dòng kẻ; Equation: Phép tính; Correct: Đúng; Write down the complete equation on the answer sheet: Viết phép tính hoàn chỉnh vào phiếu trả lời. 15   8   6   1 = 16",
      "imageUrl": "/images/timo/grade2/final2/q12.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final2/q12_A.png",
        "/images/timo/grade2/final2/q12_B.png",
        "/images/timo/grade2/final2/q12_C.png",
        "/images/timo/grade2/final2/q12_D.png"
      ]
    },
    {
      "id": 13,
      "category": "Logical thinking",
      "questionEn": "Fill the lines with ‘’ and ‘ + ’ to make the equation below correct. (Write down the complete equation on the answer sheet).",
      "questionVn": "Line: Dòng kẻ; Equation: Phép tính; Correct: Đúng; Write down the complete equation on the answer sheet: Viết phép tính hoàn chỉnh vào phiếu trả lời. 6   4   3   2 = 29",
      "imageUrl": "/images/timo/grade2/final2/q13.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final2/q13_A.png",
        "/images/timo/grade2/final2/q13_B.png",
        "/images/timo/grade2/final2/q13_C.png",
        "/images/timo/grade2/final2/q13_D.png"
      ]
    },
    {
      "id": 14,
      "category": "Logical thinking",
      "questionEn": "If A is odd number, the result of    1 2 A A A     is odd or even?",
      "questionVn": "Odd: Lẻ; Determine: Xác định; Result: Kết quả; Even: Chẵn.  39 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com",
      "imageUrl": "/images/timo/grade2/final2/q14.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final2/q14_A.png",
        "/images/timo/grade2/final2/q14_B.png",
        "/images/timo/grade2/final2/q14_C.png",
        "/images/timo/grade2/final2/q14_D.png"
      ]
    },
    {
      "id": 15,
      "category": "Logical thinking",
      "questionEn": "If A and B are both 1-digit numbers and 0 C  , find the value of A B  .",
      "questionVn": "1-digit number: Số có 1 chữ số; Value: Giá trị.  B A  A B C 8 7 Geometry / Hình học",
      "imageUrl": "/images/timo/grade2/final2/q15.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final2/q15_A.png",
        "/images/timo/grade2/final2/q15_B.png",
        "/images/timo/grade2/final2/q15_C.png",
        "/images/timo/grade2/final2/q15_D.png"
      ]
    },
    {
      "id": 16,
      "category": "Logical thinking",
      "questionEn": "According to the pattern below, what is the figure in the space (‚__‛)?",
      "questionVn": "Pattern: Quy luật; Figure: Hình vẽ; Space: Chỗ trống. ● ▲  ●  ● ▲  ●  ● ▲  ● __ ● ▲  ●  ...",
      "imageUrl": "/images/timo/grade2/final2/q16.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final2/q16_A.png",
        "/images/timo/grade2/final2/q16_B.png",
        "/images/timo/grade2/final2/q16_C.png",
        "/images/timo/grade2/final2/q16_D.png"
      ]
    },
    {
      "id": 17,
      "category": "Logical thinking",
      "questionEn": "How many square(s) is / are there in the figure below?",
      "questionVn": "Square: Hình vuông; Figure: Hình vẽ.",
      "imageUrl": "/images/timo/grade2/final2/q17.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final2/q17_A.png",
        "/images/timo/grade2/final2/q17_B.png",
        "/images/timo/grade2/final2/q17_C.png",
        "/images/timo/grade2/final2/q17_D.png"
      ]
    },
    {
      "id": 18,
      "category": "Logical thinking",
      "questionEn": "The lengths of two sides for a triangle are 6cm and 10cm respectively and all length are integers. Find the maximum length of the other length.",
      "questionVn": "Length: Độ dài; Side: Cạnh; Triangle: Hình tam giác; Integer: Số nguyên; Maximum length: Độ dài lớn nhất.",
      "imageUrl": "/images/timo/grade2/final2/q18.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final2/q18_A.png",
        "/images/timo/grade2/final2/q18_B.png",
        "/images/timo/grade2/final2/q18_C.png",
        "/images/timo/grade2/final2/q18_D.png"
      ]
    },
    {
      "id": 19,
      "category": "Logical thinking",
      "questionEn": "At least how many squares can be seen if viewing the figure below from side?",
      "questionVn": "At least: Ít nhất; Square: Hình vuông; Figure: Hình vẽ; From side: Từ bên cạnh.",
      "imageUrl": "/images/timo/grade2/final2/q19.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final2/q19_A.png",
        "/images/timo/grade2/final2/q19_B.png",
        "/images/timo/grade2/final2/q19_C.png",
        "/images/timo/grade2/final2/q19_D.png"
      ]
    },
    {
      "id": 20,
      "category": "Logical thinking",
      "questionEn": "At most how many pieces can be formed by using 4 lines to cut a circle?",
      "questionVn": "At most: Nhiều nhất; Pieces: Mảnh; Formed by: Tạo ra bởi; Line: Đường thẳng; Circle: Đường tròn.  40 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com  Combinatorics / Tổ hợp",
      "imageUrl": "/images/timo/grade2/final2/q20.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final2/q20_A.png",
        "/images/timo/grade2/final2/q20_B.png",
        "/images/timo/grade2/final2/q20_C.png",
        "/images/timo/grade2/final2/q20_D.png"
      ]
    },
    {
      "id": 21,
      "category": "Logical thinking",
      "questionEn": "Choose 2 digits, without repetition, from 0, 3, 5, 7, 8 to form 2-digit numbers. Of these 2- digit numbers, how many of them are odd number?",
      "questionVn": "Digit: Chữ số; Without repetition: Không lặp lại; 2-digit number: Số có 2 chữ số; Odd number: Số lẻ.",
      "imageUrl": "/images/timo/grade2/final2/q21.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final2/q21_A.png",
        "/images/timo/grade2/final2/q21_B.png",
        "/images/timo/grade2/final2/q21_C.png",
        "/images/timo/grade2/final2/q21_D.png"
      ]
    },
    {
      "id": 22,
      "category": "Logical thinking",
      "questionEn": "What is the greatest 4-digit even number by using 0, 3, 5, 7 and 8? (Each digit can only be used once).",
      "questionVn": "Greatest 4-digit even number: Số chẵn có 4 chữ số lớn nhất; Each digit can only be used once: Mỗi chữ số chỉ được dùng 1 lần.",
      "imageUrl": "/images/timo/grade2/final2/q22.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final2/q22_A.png",
        "/images/timo/grade2/final2/q22_B.png",
        "/images/timo/grade2/final2/q22_C.png",
        "/images/timo/grade2/final2/q22_D.png"
      ]
    },
    {
      "id": 23,
      "category": "Logical thinking",
      "questionEn": "Pick 3 from 9 competitors to get gold, silver, bronze reward. How many different combination(s) is/are there?",
      "questionVn": "Competitor: Vận động viên, Reward: Giải thưởng; Different combinations: Sự lựa chọn khác nhau.",
      "imageUrl": "/images/timo/grade2/final2/q23.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final2/q23_A.png",
        "/images/timo/grade2/final2/q23_B.png",
        "/images/timo/grade2/final2/q23_C.png",
        "/images/timo/grade2/final2/q23_D.png"
      ]
    },
    {
      "id": 24,
      "category": "Logical thinking",
      "questionEn": "Chris has ten $1 coins, nine $2 coins and three $5 coins, at most how many book(s) can he buy given that each book costs $4?",
      "questionVn": "Coin: Đồng xu; At most: Nhiều nhất.",
      "imageUrl": "/images/timo/grade2/final2/q24.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final2/q24_A.png",
        "/images/timo/grade2/final2/q24_B.png",
        "/images/timo/grade2/final2/q24_C.png",
        "/images/timo/grade2/final2/q24_D.png"
      ]
    },
    {
      "id": 25,
      "category": "Logical thinking",
      "questionEn": "Which number below is the greatest?",
      "questionVn": "Number: Số; Greatest: Lớn nhất. 20196951 、 20186421、 2020345 、 20198462   41 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com",
      "imageUrl": "/images/timo/grade2/final2/q25.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final2/q25_A.png",
        "/images/timo/grade2/final2/q25_B.png",
        "/images/timo/grade2/final2/q25_C.png",
        "/images/timo/grade2/final2/q25_D.png"
      ]
    }
  ],
  [
    {
      "id": 1,
      "category": "Logical thinking",
      "questionEn": "Amy’s father has 5 children, how many brothers and sisters does Amy have?",
      "questionVn": "Amy’s father: Bố của Amy; Brother: Anh/em trai; Sister: Chị/em gái.",
      "imageUrl": "/images/timo/grade2/final3/q1.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final3/q1_A.png",
        "/images/timo/grade2/final3/q1_B.png",
        "/images/timo/grade2/final3/q1_C.png",
        "/images/timo/grade2/final3/q1_D.png"
      ]
    },
    {
      "id": 2,
      "category": "Logical thinking",
      "questionEn": "According to the pattern shown below, how many triangle(s) is / are there within the 26th symbol counting from the left?",
      "questionVn": "Pattern: Quy luật; Triangle: Hình tam giác; 26th symbol: Ký hiệu thứ 26; From the left: Từ bên trái. ○  △  □ ○  △  □ ○  △  □ <",
      "imageUrl": "/images/timo/grade2/final3/q2.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final3/q2_A.png",
        "/images/timo/grade2/final3/q2_B.png",
        "/images/timo/grade2/final3/q2_C.png",
        "/images/timo/grade2/final3/q2_D.png"
      ]
    },
    {
      "id": 3,
      "category": "Logical thinking",
      "questionEn": "When Amy was born, mum was 34 years old. When Amy will be 15 years old, how old will mum be?",
      "questionVn": "Born: Sinh ra; Years old: Tuổi.",
      "imageUrl": "/images/timo/grade2/final3/q3.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final3/q3_A.png",
        "/images/timo/grade2/final3/q3_B.png",
        "/images/timo/grade2/final3/q3_C.png",
        "/images/timo/grade2/final3/q3_D.png"
      ]
    },
    {
      "id": 4,
      "category": "Logical thinking",
      "questionEn": "In year 2018, how many month(s) is / are there with 31 days?",
      "questionVn": "Year: Năm; Month: Tháng; Day: Ngày.",
      "imageUrl": "/images/timo/grade2/final3/q4.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final3/q4_A.png",
        "/images/timo/grade2/final3/q4_B.png",
        "/images/timo/grade2/final3/q4_C.png",
        "/images/timo/grade2/final3/q4_D.png"
      ]
    },
    {
      "id": 5,
      "category": "Logical thinking",
      "questionEn": "According to the pattern below, what is the English letter in the space?",
      "questionVn": "Pattern: Quy luật; English letter: Chữ cái Tiếng Anh; Space: Chỗ trống. A 、 E 、 I 、 M 、 __ Arithmetic / Số học",
      "imageUrl": "/images/timo/grade2/final3/q5.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final3/q5_A.png",
        "/images/timo/grade2/final3/q5_B.png",
        "/images/timo/grade2/final3/q5_C.png",
        "/images/timo/grade2/final3/q5_D.png"
      ]
    },
    {
      "id": 6,
      "category": "Logical thinking",
      "questionEn": "Find the value of 2 4 6 8 10 12 14 16     .",
      "questionVn": "Value: Giá trị.",
      "imageUrl": "/images/timo/grade2/final3/q6.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final3/q6_A.png",
        "/images/timo/grade2/final3/q6_B.png",
        "/images/timo/grade2/final3/q6_C.png",
        "/images/timo/grade2/final3/q6_D.png"
      ]
    },
    {
      "id": 7,
      "category": "Logical thinking",
      "questionEn": "Find the value of 17 11 17 3 17 4     .",
      "questionVn": "Value: Giá trị.",
      "imageUrl": "/images/timo/grade2/final3/q7.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final3/q7_A.png",
        "/images/timo/grade2/final3/q7_B.png",
        "/images/timo/grade2/final3/q7_C.png",
        "/images/timo/grade2/final3/q7_D.png"
      ]
    },
    {
      "id": 8,
      "category": "Logical thinking",
      "questionEn": "Find the value of 2 5 8 11 14 17 20 23 26       .",
      "questionVn": "Value: Giá trị.",
      "imageUrl": "/images/timo/grade2/final3/q8.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final3/q8_A.png",
        "/images/timo/grade2/final3/q8_B.png",
        "/images/timo/grade2/final3/q8_C.png",
        "/images/timo/grade2/final3/q8_D.png"
      ]
    },
    {
      "id": 9,
      "category": "Logical thinking",
      "questionEn": "Find the value of 1 2 3 4 5 6 5 4 3 2 1 .",
      "questionVn": "Value: Giá trị.",
      "imageUrl": "/images/timo/grade2/final3/q9.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final3/q9_A.png",
        "/images/timo/grade2/final3/q9_B.png",
        "/images/timo/grade2/final3/q9_C.png",
        "/images/timo/grade2/final3/q9_D.png"
      ]
    },
    {
      "id": 10,
      "category": "Logical thinking",
      "questionEn": "A and B are both 1-digit numbers and A < B. What is the value of A B  ?",
      "questionVn": "1-digit number: Số có 1 chữ số; Value: Giá trị; Equation: Phép tính.  42 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com Number Theory / Lý thuyết số",
      "imageUrl": "/images/timo/grade2/final3/q10.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final3/q10_A.png",
        "/images/timo/grade2/final3/q10_B.png",
        "/images/timo/grade2/final3/q10_C.png",
        "/images/timo/grade2/final3/q10_D.png"
      ]
    },
    {
      "id": 11,
      "category": "Logical thinking",
      "questionEn": "Determine the result of 3 7 11 15 19 23 27 31       is odd or even.",
      "questionVn": "Determine: Xác định; Result: Kết quả; Odd: Lẻ; Even: Chẵn.",
      "imageUrl": "/images/timo/grade2/final3/q11.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final3/q11_A.png",
        "/images/timo/grade2/final3/q11_B.png",
        "/images/timo/grade2/final3/q11_C.png",
        "/images/timo/grade2/final3/q11_D.png"
      ]
    },
    {
      "id": 12,
      "category": "Logical thinking",
      "questionEn": "Fill the lines with ‘  ’ and ‘ – ’ to make the equation below correct. (Write down the complete equation on the answer sheet).",
      "questionVn": "Line: Dòng kẻ; Equation: Phép tính; Correct: Đúng; Write down the complete equation on the answer sheet: Viết câu trả lời hoàn chỉnh vào phiếu trả lời. 7   4   5   3 = 13",
      "imageUrl": "/images/timo/grade2/final3/q12.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final3/q12_A.png",
        "/images/timo/grade2/final3/q12_B.png",
        "/images/timo/grade2/final3/q12_C.png",
        "/images/timo/grade2/final3/q12_D.png"
      ]
    },
    {
      "id": 13,
      "category": "Logical thinking",
      "questionEn": "The numbers below follow the arithmetic sequence, what is the 9th number?",
      "questionVn": "9th number: Số thứ 9; Arithmetic sequence: Dãy số cách đều. 12、21、30、39、48、<",
      "imageUrl": "/images/timo/grade2/final3/q13.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final3/q13_A.png",
        "/images/timo/grade2/final3/q13_B.png",
        "/images/timo/grade2/final3/q13_C.png",
        "/images/timo/grade2/final3/q13_D.png"
      ]
    },
    {
      "id": 14,
      "category": "Logical thinking",
      "questionEn": "How many 2-digit odd number(s) that is / are multiples of 3 is / are there?",
      "questionVn": "2-digit odd number: Số lẻ có 2 chữ số; Multiple of 3: Bội của 3.",
      "imageUrl": "/images/timo/grade2/final3/q14.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final3/q14_A.png",
        "/images/timo/grade2/final3/q14_B.png",
        "/images/timo/grade2/final3/q14_C.png",
        "/images/timo/grade2/final3/q14_D.png"
      ]
    },
    {
      "id": 15,
      "category": "Logical thinking",
      "questionEn": "What is the largest 2-digit number that can be divisible by 4 and 6?",
      "questionVn": "Largest 2-digit number: Số có 2 chữ số lớn nhất; Divisible by: Chia hết cho. Geometry / Hình học",
      "imageUrl": "/images/timo/grade2/final3/q15.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final3/q15_A.png",
        "/images/timo/grade2/final3/q15_B.png",
        "/images/timo/grade2/final3/q15_C.png",
        "/images/timo/grade2/final3/q15_D.png"
      ]
    },
    {
      "id": 16,
      "category": "Logical thinking",
      "questionEn": "How many squares are there in the figure below?",
      "questionVn": "Square: Hình vuông; Figure: Hình vẽ.",
      "imageUrl": "/images/timo/grade2/final3/q16.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final3/q16_A.png",
        "/images/timo/grade2/final3/q16_B.png",
        "/images/timo/grade2/final3/q16_C.png",
        "/images/timo/grade2/final3/q16_D.png"
      ]
    },
    {
      "id": 17,
      "category": "Logical thinking",
      "questionEn": "A prism has 8 vertices, how many face(s) does this prism have?",
      "questionVn": "Prism: Hình lăng trụ; Vertice: Đỉnh; Face: Mặt.",
      "imageUrl": "/images/timo/grade2/final3/q17.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final3/q17_A.png",
        "/images/timo/grade2/final3/q17_B.png",
        "/images/timo/grade2/final3/q17_C.png",
        "/images/timo/grade2/final3/q17_D.png"
      ]
    },
    {
      "id": 18,
      "category": "Logical thinking",
      "questionEn": "It is known as the lengths of shorter sides for a right-angled triangle are 6cm and 8cm respectively. Find the length of the longest length.",
      "questionVn": "Length: Độ dài; Shorter side: Cạnh ngắn hơn; Right-angled triangle: Tam giác vuông; Longest length: Cạnh dài nhất.",
      "imageUrl": "/images/timo/grade2/final3/q18.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final3/q18_A.png",
        "/images/timo/grade2/final3/q18_B.png",
        "/images/timo/grade2/final3/q18_C.png",
        "/images/timo/grade2/final3/q18_D.png"
      ]
    },
    {
      "id": 19,
      "category": "Logical thinking",
      "questionEn": "At least how many squares can be seen if viewing the figure below from side?",
      "questionVn": "At least: Ít nhất; Square: Hình vuông; Figure: Hình vẽ; From side: Từ bên cạnh.  43 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com",
      "imageUrl": "/images/timo/grade2/final3/q19.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final3/q19_A.png",
        "/images/timo/grade2/final3/q19_B.png",
        "/images/timo/grade2/final3/q19_C.png",
        "/images/timo/grade2/final3/q19_D.png"
      ]
    },
    {
      "id": 20,
      "category": "Logical thinking",
      "questionEn": "How many line segment(s) is / are there in the figure below?",
      "questionVn": "Line segment: Đoạn thẳng; Figure: Hình vẽ.  Combinatorics / Tổ hợp",
      "imageUrl": "/images/timo/grade2/final3/q20.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final3/q20_A.png",
        "/images/timo/grade2/final3/q20_B.png",
        "/images/timo/grade2/final3/q20_C.png",
        "/images/timo/grade2/final3/q20_D.png"
      ]
    },
    {
      "id": 21,
      "category": "Logical thinking",
      "questionEn": "According to the following answers, how many 2-digit numbers are there?",
      "questionVn": "Answer: Kết quả; 2-digit number: Số có 2 chữ số. 15 13, 19 7, 14 9, 5 9, 19 10, 11 8, 17 9, 3 7, 18 7         ",
      "imageUrl": "/images/timo/grade2/final3/q21.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final3/q21_A.png",
        "/images/timo/grade2/final3/q21_B.png",
        "/images/timo/grade2/final3/q21_C.png",
        "/images/timo/grade2/final3/q21_D.png"
      ]
    },
    {
      "id": 22,
      "category": "Logical thinking",
      "questionEn": "Choose 2 digits, without repetition, from 0, 3, 4, 5, 7 to form 2-digit numbers. Of these 2- digit numbers, how many of them are odd numbers?",
      "questionVn": "Digit: Chữ số; Without repetition: Không lặp lại; 2-digit number: Số có 2 chữ số; Odd number: Số lẻ.",
      "imageUrl": "/images/timo/grade2/final3/q22.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final3/q22_A.png",
        "/images/timo/grade2/final3/q22_B.png",
        "/images/timo/grade2/final3/q22_C.png",
        "/images/timo/grade2/final3/q22_D.png"
      ]
    },
    {
      "id": 23,
      "category": "Logical thinking",
      "questionEn": "There are 2 ways from the market to the train station. There are 4 ways from the train station to the cinema. There are 3 ways from the cinema to the library. How many different way(s) is / are from the market to the library through the train station and cinema respectively?",
      "questionVn": "Way: Cách.",
      "imageUrl": "/images/timo/grade2/final3/q23.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final3/q23_A.png",
        "/images/timo/grade2/final3/q23_B.png",
        "/images/timo/grade2/final3/q23_C.png",
        "/images/timo/grade2/final3/q23_D.png"
      ]
    },
    {
      "id": 24,
      "category": "Logical thinking",
      "questionEn": "What is the smallest 4-digit number by using 0, 2, 4, 6 and 8? (Each digit can only be used once).",
      "questionVn": "Smallest 4-digit number: Số có 4 chữ số nhỏ nhất; Each digit can only be used once: Mỗi chữ số chỉ được sử dụng một lần.",
      "imageUrl": "/images/timo/grade2/final3/q24.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final3/q24_A.png",
        "/images/timo/grade2/final3/q24_B.png",
        "/images/timo/grade2/final3/q24_C.png",
        "/images/timo/grade2/final3/q24_D.png"
      ]
    },
    {
      "id": 25,
      "category": "Logical thinking",
      "questionEn": "Peter has 6 $1 coins, 2 $2 coins and 4 $5 coins. At most how many souvenir(s) can he buy for a souvenir costed $6?",
      "questionVn": "Coin: Đồng xu; Souvenir: Quà lưu niệm; At most: Nhiều nhất.   44 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com",
      "imageUrl": "/images/timo/grade2/final3/q25.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final3/q25_A.png",
        "/images/timo/grade2/final3/q25_B.png",
        "/images/timo/grade2/final3/q25_C.png",
        "/images/timo/grade2/final3/q25_D.png"
      ]
    }
  ],
  [
    {
      "id": 1,
      "category": "Logical thinking",
      "questionEn": "Given Amy has 3 sisters and 2 brothers, how many child(ren) does Amy’s mother have?",
      "questionVn": "Sister: Chị/em gái; Brother: Anh/em trai; Children: Người con; Amy’s other: Mẹ của Amy.",
      "imageUrl": "/images/timo/grade2/final4/q1.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final4/q1_A.png",
        "/images/timo/grade2/final4/q1_B.png",
        "/images/timo/grade2/final4/q1_C.png",
        "/images/timo/grade2/final4/q1_D.png"
      ]
    },
    {
      "id": 2,
      "category": "Logical thinking",
      "questionEn": "According to the pattern shown below, what is the 27th symbol counting from the left?",
      "questionVn": "Pattern: Quy luật; 27th symbol: Biểu tượng thứ 27; From the left: Từ bên trái. ○ △ □ ○ ○ △ △  □ □ ○ ○ ○ △ △ △ □ □ □<",
      "imageUrl": "/images/timo/grade2/final4/q2.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final4/q2_A.png",
        "/images/timo/grade2/final4/q2_B.png",
        "/images/timo/grade2/final4/q2_C.png",
        "/images/timo/grade2/final4/q2_D.png"
      ]
    },
    {
      "id": 3,
      "category": "Logical thinking",
      "questionEn": "After 6 years, Amy will be 13 years old. How old was Amy 4 years ago?",
      "questionVn": "Year: Năm; Year old: Tuổi.",
      "imageUrl": "/images/timo/grade2/final4/q3.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final4/q3_A.png",
        "/images/timo/grade2/final4/q3_B.png",
        "/images/timo/grade2/final4/q3_C.png",
        "/images/timo/grade2/final4/q3_D.png"
      ]
    },
    {
      "id": 4,
      "category": "Logical thinking",
      "questionEn": "John wrote a 2-digit number on a piece of paper and asked Peter to guess it. Peter asked: ‚Is the number 89?‛ John replied: ‚One of the digits is correct, the position of that digit is also correct.‛ Peter asked again: ‚Is the number 7?‛ John replied: ‚One of the digits is correct, the position of that digit is wrong.‛ Peter asked again: ‚Is the number 75?‛ John said: ‚One of the digits is correct, the position of that digit is correct.‛ What is the number written by John?",
      "questionVn": "2-digit number: Số có 2 chữ số; Number: Số; Digit: Chữ số; Correct: Đúng; Wrong: Sai; Position of that digit: Vị trí của chữ số đó.",
      "imageUrl": "/images/timo/grade2/final4/q4.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final4/q4_A.png",
        "/images/timo/grade2/final4/q4_B.png",
        "/images/timo/grade2/final4/q4_C.png",
        "/images/timo/grade2/final4/q4_D.png"
      ]
    },
    {
      "id": 5,
      "category": "Logical thinking",
      "questionEn": "According to the pattern below, how many  is / are there in the 10th Group?",
      "questionVn": "Pattern: Quy luật, 10th Group: Nhóm thứ 10. Arithmetic / Số học",
      "imageUrl": "/images/timo/grade2/final4/q5.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final4/q5_A.png",
        "/images/timo/grade2/final4/q5_B.png",
        "/images/timo/grade2/final4/q5_C.png",
        "/images/timo/grade2/final4/q5_D.png"
      ]
    },
    {
      "id": 6,
      "category": "Logical thinking",
      "questionEn": "Find the value of 1 3 5 7 9 11 13 15 17 19      .",
      "questionVn": "Value: Giá trị.  45 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com",
      "imageUrl": "/images/timo/grade2/final4/q6.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final4/q6_A.png",
        "/images/timo/grade2/final4/q6_B.png",
        "/images/timo/grade2/final4/q6_C.png",
        "/images/timo/grade2/final4/q6_D.png"
      ]
    },
    {
      "id": 7,
      "category": "Logical thinking",
      "questionEn": "Find the value of 15 12 15 3 15 5    .",
      "questionVn": "Value: Giá trị.",
      "imageUrl": "/images/timo/grade2/final4/q7.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final4/q7_A.png",
        "/images/timo/grade2/final4/q7_B.png",
        "/images/timo/grade2/final4/q7_C.png",
        "/images/timo/grade2/final4/q7_D.png"
      ]
    },
    {
      "id": 8,
      "category": "Logical thinking",
      "questionEn": "Find the value of 2 4 6 8 10 12 14 16 18      .",
      "questionVn": "Value: Giá trị.",
      "imageUrl": "/images/timo/grade2/final4/q8.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final4/q8_A.png",
        "/images/timo/grade2/final4/q8_B.png",
        "/images/timo/grade2/final4/q8_C.png",
        "/images/timo/grade2/final4/q8_D.png"
      ]
    },
    {
      "id": 9,
      "category": "Logical thinking",
      "questionEn": "What is the number that should be filled in the blank?",
      "questionVn": "Number: Số; Blank: Chỗ trống. 123 _____ 861  ",
      "imageUrl": "/images/timo/grade2/final4/q9.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final4/q9_A.png",
        "/images/timo/grade2/final4/q9_B.png",
        "/images/timo/grade2/final4/q9_C.png",
        "/images/timo/grade2/final4/q9_D.png"
      ]
    },
    {
      "id": 10,
      "category": "Logical thinking",
      "questionEn": "If A and B are both 1-digit numbers, what is the value of B?",
      "questionVn": "1-digit number: Số có 1 chữ số; Value: Giá trị. A A + A = B 0 Number Theory / Lý thuyết số",
      "imageUrl": "/images/timo/grade2/final4/q10.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final4/q10_A.png",
        "/images/timo/grade2/final4/q10_B.png",
        "/images/timo/grade2/final4/q10_C.png",
        "/images/timo/grade2/final4/q10_D.png"
      ]
    },
    {
      "id": 11,
      "category": "Logical thinking",
      "questionEn": "Amy has 118 apples and John has 22 apples. How many apple(s) does Amy have to give John to make them have the same number of apples?",
      "questionVn": "Give: Cho; The same number of: Số lượng bằng nhau.",
      "imageUrl": "/images/timo/grade2/final4/q11.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final4/q11_A.png",
        "/images/timo/grade2/final4/q11_B.png",
        "/images/timo/grade2/final4/q11_C.png",
        "/images/timo/grade2/final4/q11_D.png"
      ]
    },
    {
      "id": 12,
      "category": "Logical thinking",
      "questionEn": "4 students have 30 balloons in total and each of them has a different number of balloons. At least how many balloon(s) does the student with the most balloons have?",
      "questionVn": "In total: Tổng số; Different number of: Số lượng khác nhau; At least: Ít nhất; The most balloon: Nhiều bóng bay nhất.",
      "imageUrl": "/images/timo/grade2/final4/q12.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final4/q12_A.png",
        "/images/timo/grade2/final4/q12_B.png",
        "/images/timo/grade2/final4/q12_C.png",
        "/images/timo/grade2/final4/q12_D.png"
      ]
    },
    {
      "id": 13,
      "category": "Logical thinking",
      "questionEn": "The numbers below follow the arithmetic sequence, what is the 10th number?",
      "questionVn": "Number: Số; Arithmetic sequence: Dãy số cách đều. 21、33、45、57、69、<",
      "imageUrl": "/images/timo/grade2/final4/q13.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final4/q13_A.png",
        "/images/timo/grade2/final4/q13_B.png",
        "/images/timo/grade2/final4/q13_C.png",
        "/images/timo/grade2/final4/q13_D.png"
      ]
    },
    {
      "id": 14,
      "category": "Logical thinking",
      "questionEn": "How many 3-digit even number(s) that are multiples of 5 is / are there?",
      "questionVn": "3-digit even number: Số chẵn có 3 chữ số; Multiple of 5: Bội của 5.",
      "imageUrl": "/images/timo/grade2/final4/q14.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final4/q14_A.png",
        "/images/timo/grade2/final4/q14_B.png",
        "/images/timo/grade2/final4/q14_C.png",
        "/images/timo/grade2/final4/q14_D.png"
      ]
    },
    {
      "id": 15,
      "category": "Logical thinking",
      "questionEn": "What is the largest 2-digit number that can be divisible by 3 and 5?",
      "questionVn": "Largest 2-digit number: Số có 2 chữ số lớn nhất; Divisible by: Chia hết cho. Geometry / Hình học",
      "imageUrl": "/images/timo/grade2/final4/q15.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final4/q15_A.png",
        "/images/timo/grade2/final4/q15_B.png",
        "/images/timo/grade2/final4/q15_C.png",
        "/images/timo/grade2/final4/q15_D.png"
      ]
    },
    {
      "id": 16,
      "category": "Logical thinking",
      "questionEn": "How many square(s) is / are there in the figure below?",
      "questionVn": "Square: Hình vuông; Figure: Hình vẽ.  46 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com",
      "imageUrl": "/images/timo/grade2/final4/q16.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final4/q16_A.png",
        "/images/timo/grade2/final4/q16_B.png",
        "/images/timo/grade2/final4/q16_C.png",
        "/images/timo/grade2/final4/q16_D.png"
      ]
    },
    {
      "id": 17,
      "category": "Logical thinking",
      "questionEn": "A prism has 7 faces, how many vertice(s) does this prism have?",
      "questionVn": "Prism: Hình lăng trụ; Face: Mặt; Vertice: Đỉnh.",
      "imageUrl": "/images/timo/grade2/final4/q17.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final4/q17_A.png",
        "/images/timo/grade2/final4/q17_B.png",
        "/images/timo/grade2/final4/q17_C.png",
        "/images/timo/grade2/final4/q17_D.png"
      ]
    },
    {
      "id": 18,
      "category": "Logical thinking",
      "questionEn": "At most how many right angle(s) could a triangle contain?",
      "questionVn": "At most: Nhiều nhất; Right angle: Góc vuông; Triangle: Hình tam giác.",
      "imageUrl": "/images/timo/grade2/final4/q18.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final4/q18_A.png",
        "/images/timo/grade2/final4/q18_B.png",
        "/images/timo/grade2/final4/q18_C.png",
        "/images/timo/grade2/final4/q18_D.png"
      ]
    },
    {
      "id": 19,
      "category": "Logical thinking",
      "questionEn": "At least how many squares can be seen if viewing the figure below from top?",
      "questionVn": "At least: Ít nhất; Square: Hình vuông; Figure: Hình vẽ; From top: Từ phía trên.",
      "imageUrl": "/images/timo/grade2/final4/q19.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final4/q19_A.png",
        "/images/timo/grade2/final4/q19_B.png",
        "/images/timo/grade2/final4/q19_C.png",
        "/images/timo/grade2/final4/q19_D.png"
      ]
    },
    {
      "id": 20,
      "category": "Logical thinking",
      "questionEn": "At most how many triangles are there by drawing 4 straight lines on a plane?",
      "questionVn": "At most: Nhiều nhất; Triangle: Hình tam giác; Straight line: Đường thẳng; Plane: Mặt phẳng. Combinatorics / Tổ hợp",
      "imageUrl": "/images/timo/grade2/final4/q20.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final4/q20_A.png",
        "/images/timo/grade2/final4/q20_B.png",
        "/images/timo/grade2/final4/q20_C.png",
        "/images/timo/grade2/final4/q20_D.png"
      ]
    },
    {
      "id": 21,
      "category": "Logical thinking",
      "questionEn": "Three people Amy, Andy and Johnny have somes apples. After Amy gives 4 apples to Andy and 5 apples to Johnny, they will have the same number of apples. How many apple(s) did Amy have more than Andy originally?",
      "questionVn": "The same number of: Số lượng bằng nhau; Give: Cho; More than: Nhiều hơn; Originally: Ban đầu.",
      "imageUrl": "/images/timo/grade2/final4/q21.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final4/q21_A.png",
        "/images/timo/grade2/final4/q21_B.png",
        "/images/timo/grade2/final4/q21_C.png",
        "/images/timo/grade2/final4/q21_D.png"
      ]
    },
    {
      "id": 22,
      "category": "Logical thinking",
      "questionEn": "Choose 2 digits, without repetition, from 2, 3, 4, 5, 6 to form 2-digit numbers. How many even number(s) is / are there?",
      "questionVn": "Digit: Chữ số; Without repetition: Không lặp lại; 2-digit number: Số có 2 chữ số; Even number: Số chẵn.",
      "imageUrl": "/images/timo/grade2/final4/q22.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final4/q22_A.png",
        "/images/timo/grade2/final4/q22_B.png",
        "/images/timo/grade2/final4/q22_C.png",
        "/images/timo/grade2/final4/q22_D.png"
      ]
    },
    {
      "id": 23,
      "category": "Logical thinking",
      "questionEn": "There are 2 ways from the market to the train station. There are 5 ways from the train station to the cinema. There are 4 ways from the cinema to the library. How many different way(s) is / are there from the market to the library through the train station and cinema?",
      "questionVn": "Way: Cách; Different: Khác nhau.",
      "imageUrl": "/images/timo/grade2/final4/q23.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final4/q23_A.png",
        "/images/timo/grade2/final4/q23_B.png",
        "/images/timo/grade2/final4/q23_C.png",
        "/images/timo/grade2/final4/q23_D.png"
      ]
    },
    {
      "id": 24,
      "category": "Logical thinking",
      "questionEn": "What is the smallest 5-digit number by using 0, 1, 2, 3 and 4? (Each digit can only be used once).",
      "questionVn": "Smallest 5-digit number: Số có 5 chữ số nhỏ nhất; Each digit can only be used once: Mỗi chữ số chỉ dùng một lần.",
      "imageUrl": "/images/timo/grade2/final4/q24.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final4/q24_A.png",
        "/images/timo/grade2/final4/q24_B.png",
        "/images/timo/grade2/final4/q24_C.png",
        "/images/timo/grade2/final4/q24_D.png"
      ]
    },
    {
      "id": 25,
      "category": "Logical thinking",
      "questionEn": "Peter has 7 $1 coins, 2 $2 coins and 1 $5 coin, how many way(s) can he buy for a souvenir costed $7 without any changes?",
      "questionVn": "Coin: Đồng xu; Way: Cách; Souvenir: Đồ lưu niệm; Without any changes: Không cần trả lại tiền.  47 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com",
      "imageUrl": "/images/timo/grade2/final4/q25.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final4/q25_A.png",
        "/images/timo/grade2/final4/q25_B.png",
        "/images/timo/grade2/final4/q25_C.png",
        "/images/timo/grade2/final4/q25_D.png"
      ]
    }
  ],
  [
    {
      "id": 1,
      "category": "Logical thinking",
      "questionEn": "John, Amy and Peter are good friends. One of them is a merchant. One of them is a student. One of them is a soldier. In addition, we know following situations: Peter’s age is larger than soldier’s. Student’s age is smaller than Amy’s. John’s age is different from that of student’s. Who is the student?",
      "questionVn": "Age: Tuổi; Larger than: Lớn hơn; Smaller than: Bé hơn; Different from: Khác.",
      "imageUrl": "/images/timo/grade2/final5/q1.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final5/q1_A.png",
        "/images/timo/grade2/final5/q1_B.png",
        "/images/timo/grade2/final5/q1_C.png",
        "/images/timo/grade2/final5/q1_D.png"
      ]
    },
    {
      "id": 2,
      "category": "Logical thinking",
      "questionEn": "According to the pattern shown below, which symbol should be the 28th one starting from the left?",
      "questionVn": "Pattern: Quy luật; Symbol: Ký hiệu; From the left: Từ phía bên trái? ○ ○ ○ △ □ ○ ○ ○ △ □ ○ ○ ○ △ □ ○ <",
      "imageUrl": "/images/timo/grade2/final5/q2.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final5/q2_A.png",
        "/images/timo/grade2/final5/q2_B.png",
        "/images/timo/grade2/final5/q2_C.png",
        "/images/timo/grade2/final5/q2_D.png"
      ]
    },
    {
      "id": 3,
      "category": "Logical thinking",
      "questionEn": "Amy bought a pair of beautiful shoes. Her classmates never saw this pair of shoes before and they start guessing. Peter said that ‚Your shoes are not red.‛ John said that ‚Your shoes are either yellow or black.‛ Andy said that ‚Your shoes must be black.‛ Within the point of view of these 3 people, two of them are correct and one of them is wrong. What colour are Amy’s shoes?",
      "questionVn": "Guess: Đoán; Either yellow or black: Vàng hoặc đen; Point of view: Ý kiến; Two of them: Hai trong số họ; Correct: Đúng; Wrong: Sai; Color: Màu sắc.",
      "imageUrl": "/images/timo/grade2/final5/q3.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final5/q3_A.png",
        "/images/timo/grade2/final5/q3_B.png",
        "/images/timo/grade2/final5/q3_C.png",
        "/images/timo/grade2/final5/q3_D.png"
      ]
    },
    {
      "id": 4,
      "category": "Logical thinking",
      "questionEn": "John wrote a 3-digit number on a piece of paper and asked Peter to guess it. Peter asked: ‚Is the number 892?‛ John replied: ‚One of the digits is correct, the position of that digit is also correct.‛ Peter asked again: ‚Is the number 78?‛ John replied: ‚Two digits are correct, but the positions of those digits are both wrong.‛ Peter asked again: ‚Is the number 785?‛ John said: ‚All three digits are correct, but the digits are all in the wrong places.‛ What is the number written by John?",
      "questionVn": "3-digit number: Số có 3 chữ số; Digit: Chữ số; Correct: Đúng; Wrong: Sai; The position of that digit: Vị trí của chữ số đó; Number: Số.",
      "imageUrl": "/images/timo/grade2/final5/q4.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final5/q4_A.png",
        "/images/timo/grade2/final5/q4_B.png",
        "/images/timo/grade2/final5/q4_C.png",
        "/images/timo/grade2/final5/q4_D.png"
      ]
    },
    {
      "id": 5,
      "category": "Logical thinking",
      "questionEn": "According to the pattern below, how many circles are there in the 10th group?",
      "questionVn": "Pattern: Quy luật; Circle: Hình tròn; 10th Group: Nhóm thứ 10.  Arithmetic / Số học",
      "imageUrl": "/images/timo/grade2/final5/q5.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final5/q5_A.png",
        "/images/timo/grade2/final5/q5_B.png",
        "/images/timo/grade2/final5/q5_C.png",
        "/images/timo/grade2/final5/q5_D.png"
      ]
    },
    {
      "id": 6,
      "category": "Logical thinking",
      "questionEn": "Find the value of 366 978 166 22    .",
      "questionVn": "Value: Giá trị.  48 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com",
      "imageUrl": "/images/timo/grade2/final5/q6.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final5/q6_A.png",
        "/images/timo/grade2/final5/q6_B.png",
        "/images/timo/grade2/final5/q6_C.png",
        "/images/timo/grade2/final5/q6_D.png"
      ]
    },
    {
      "id": 7,
      "category": "Logical thinking",
      "questionEn": "Find the value of 13 14 15 16 17     .",
      "questionVn": "Value: Giá trị.",
      "imageUrl": "/images/timo/grade2/final5/q7.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final5/q7_A.png",
        "/images/timo/grade2/final5/q7_B.png",
        "/images/timo/grade2/final5/q7_C.png",
        "/images/timo/grade2/final5/q7_D.png"
      ]
    },
    {
      "id": 8,
      "category": "Logical thinking",
      "questionEn": "Find the value of 2 4 6 8 10 12 14 16 18 20       .",
      "questionVn": "Value: Giá trị.",
      "imageUrl": "/images/timo/grade2/final5/q8.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final5/q8_A.png",
        "/images/timo/grade2/final5/q8_B.png",
        "/images/timo/grade2/final5/q8_C.png",
        "/images/timo/grade2/final5/q8_D.png"
      ]
    },
    {
      "id": 9,
      "category": "Logical thinking",
      "questionEn": "Find the value of 1 2 3 4 5 6 7 8 9 10 11   .",
      "questionVn": "Value: Giá trị.",
      "imageUrl": "/images/timo/grade2/final5/q9.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final5/q9_A.png",
        "/images/timo/grade2/final5/q9_B.png",
        "/images/timo/grade2/final5/q9_C.png",
        "/images/timo/grade2/final5/q9_D.png"
      ]
    },
    {
      "id": 10,
      "category": "Logical thinking",
      "questionEn": "If A and B are both 1-digit number, what is the value of A?",
      "questionVn": "1-digit number: Số có 1 chữ số; Value: Giá trị. A B + A = 1 0 0 Number Theory / Lý thuyết số",
      "imageUrl": "/images/timo/grade2/final5/q10.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final5/q10_A.png",
        "/images/timo/grade2/final5/q10_B.png",
        "/images/timo/grade2/final5/q10_C.png",
        "/images/timo/grade2/final5/q10_D.png"
      ]
    },
    {
      "id": 11,
      "category": "Logical thinking",
      "questionEn": "Amy has 42 apples and John has 26 apples. How many apples does Amy have to give John to make them to have the same number of apples?",
      "questionVn": "Give: Cho; The same number of: Số lượng bằng nhau.",
      "imageUrl": "/images/timo/grade2/final5/q11.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final5/q11_A.png",
        "/images/timo/grade2/final5/q11_B.png",
        "/images/timo/grade2/final5/q11_C.png",
        "/images/timo/grade2/final5/q11_D.png"
      ]
    },
    {
      "id": 12,
      "category": "Logical thinking",
      "questionEn": "Andy has 26 marbles. He divides them into 4 piles so that each pile has a different number of marbles. Find the smallest possible number of marbles in the biggest pile.",
      "questionVn": "Divide into: Chia ra; Different number of: Số lượng khác nhau; The smallest possible number of: Số lượng nhỏ nhất có thể. Biggest: Lớn nhất.",
      "imageUrl": "/images/timo/grade2/final5/q12.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final5/q12_A.png",
        "/images/timo/grade2/final5/q12_B.png",
        "/images/timo/grade2/final5/q12_C.png",
        "/images/timo/grade2/final5/q12_D.png"
      ]
    },
    {
      "id": 13,
      "category": "Logical thinking",
      "questionEn": "John has a pack of marbles: 5 red, 5 blue and 6 brown. He wants to get 2 marbles of same colors without looking. What is the smallest number of marbles he needs to take out to make sure that he gets what he wants?",
      "questionVn": "Without looking: Không nhìn; Smallest number of: Số lượng nhỏ nhất; Take out: Lấy ra; Make sure: Chắc chắn.",
      "imageUrl": "/images/timo/grade2/final5/q13.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final5/q13_A.png",
        "/images/timo/grade2/final5/q13_B.png",
        "/images/timo/grade2/final5/q13_C.png",
        "/images/timo/grade2/final5/q13_D.png"
      ]
    },
    {
      "id": 14,
      "category": "Logical thinking",
      "questionEn": "The numbers below follow the Fibonacci sequence, what is the next number?",
      "questionVn": "Number: Số; Fibonacci sequence: Dãy Fibonacci; The next number: Số tiếp theo. 1、1、2、3、5、8、13、<",
      "imageUrl": "/images/timo/grade2/final5/q14.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final5/q14_A.png",
        "/images/timo/grade2/final5/q14_B.png",
        "/images/timo/grade2/final5/q14_C.png",
        "/images/timo/grade2/final5/q14_D.png"
      ]
    },
    {
      "id": 15,
      "category": "Logical thinking",
      "questionEn": "What is the largest 2-digit number that can be divisible by 4 and 6?",
      "questionVn": "Largest 2-digit number: Số có 2 chữ số lớn nhất; Divisibile by: Chia hết cho. Geometry / Hình học",
      "imageUrl": "/images/timo/grade2/final5/q15.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final5/q15_A.png",
        "/images/timo/grade2/final5/q15_B.png",
        "/images/timo/grade2/final5/q15_C.png",
        "/images/timo/grade2/final5/q15_D.png"
      ]
    },
    {
      "id": 16,
      "category": "Logical thinking",
      "questionEn": "How many obtuse angle(s) could a triangle contain?",
      "questionVn": "Obtuse angle: Góc tù; Triangle: Hình tam giác.",
      "imageUrl": "/images/timo/grade2/final5/q16.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final5/q16_A.png",
        "/images/timo/grade2/final5/q16_B.png",
        "/images/timo/grade2/final5/q16_C.png",
        "/images/timo/grade2/final5/q16_D.png"
      ]
    },
    {
      "id": 17,
      "category": "Logical thinking",
      "questionEn": "How many cubes are there in the figure below?",
      "questionVn": "Cube: Hình lập phương; Figure: Hình vẽ.  49 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com",
      "imageUrl": "/images/timo/grade2/final5/q17.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final5/q17_A.png",
        "/images/timo/grade2/final5/q17_B.png",
        "/images/timo/grade2/final5/q17_C.png",
        "/images/timo/grade2/final5/q17_D.png"
      ]
    },
    {
      "id": 18,
      "category": "Logical thinking",
      "questionEn": "How many triangles are there in the figure below?",
      "questionVn": "Triangle: Hình tam giác; Figure: Hình vẽ.",
      "imageUrl": "/images/timo/grade2/final5/q18.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final5/q18_A.png",
        "/images/timo/grade2/final5/q18_B.png",
        "/images/timo/grade2/final5/q18_C.png",
        "/images/timo/grade2/final5/q18_D.png"
      ]
    },
    {
      "id": 19,
      "category": "Logical thinking",
      "questionEn": "A prism has 23 faces, how many edges does it have?",
      "questionVn": "Prism: Hình lăng trụ; Face: Mặt; Edge: Cạnh.",
      "imageUrl": "/images/timo/grade2/final5/q19.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final5/q19_A.png",
        "/images/timo/grade2/final5/q19_B.png",
        "/images/timo/grade2/final5/q19_C.png",
        "/images/timo/grade2/final5/q19_D.png"
      ]
    },
    {
      "id": 20,
      "category": "Logical thinking",
      "questionEn": "How many squares are there in the figure below?",
      "questionVn": "Square: Hình vuông; Figure: Hình vẽ. Combinatorics / Tổ hợp",
      "imageUrl": "/images/timo/grade2/final5/q20.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final5/q20_A.png",
        "/images/timo/grade2/final5/q20_B.png",
        "/images/timo/grade2/final5/q20_C.png",
        "/images/timo/grade2/final5/q20_D.png"
      ]
    },
    {
      "id": 21,
      "category": "Logical thinking",
      "questionEn": "After Amy gives 4 apples to Andy, they have same number of apples. How many apples more did Amy have than that of Andy originally?",
      "questionVn": "Give: Cho; The same number of: Có cùng số lượng; More than: Nhiều hơn; Originally: Ban đầu.",
      "imageUrl": "/images/timo/grade2/final5/q21.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final5/q21_A.png",
        "/images/timo/grade2/final5/q21_B.png",
        "/images/timo/grade2/final5/q21_C.png",
        "/images/timo/grade2/final5/q21_D.png"
      ]
    },
    {
      "id": 22,
      "category": "Logical thinking",
      "questionEn": "Choose 2 numbers, without repetition, from 1, 4, 5, 7, 8 to form a 2-digit number. How many even numbers are there?",
      "questionVn": "Number: Số; Without repetition: Không lặp lại; 2-digit number: Số có 2 chữ số; Even number: Số chẵn.",
      "imageUrl": "/images/timo/grade2/final5/q22.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final5/q22_A.png",
        "/images/timo/grade2/final5/q22_B.png",
        "/images/timo/grade2/final5/q22_C.png",
        "/images/timo/grade2/final5/q22_D.png"
      ]
    },
    {
      "id": 23,
      "category": "Logical thinking",
      "questionEn": "There are 4 ways from school to train station and there are 5 ways from the train station to the library. How many different ways are there from school to the library through the train station?",
      "questionVn": "Way: Cách; Different: Khác nhau.",
      "imageUrl": "/images/timo/grade2/final5/q23.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final5/q23_A.png",
        "/images/timo/grade2/final5/q23_B.png",
        "/images/timo/grade2/final5/q23_C.png",
        "/images/timo/grade2/final5/q23_D.png"
      ]
    },
    {
      "id": 24,
      "category": "Logical thinking",
      "questionEn": "What is the smallest 5-digit number by using 3, 7, 1, 8 and 9? (Each digit can be used once).",
      "questionVn": "The smallest 5-digit number: Số có 5 chữ số nhỏ nhất; Each digit can be used once: Mỗi chữ số chỉ được sử dụng một lần.",
      "imageUrl": "/images/timo/grade2/final5/q24.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final5/q24_A.png",
        "/images/timo/grade2/final5/q24_B.png",
        "/images/timo/grade2/final5/q24_C.png",
        "/images/timo/grade2/final5/q24_D.png"
      ]
    },
    {
      "id": 25,
      "category": "Logical thinking",
      "questionEn": "Choose 2 numbers, without repetition, from 0, 3, 5, 6, 9 to form a two-digit number. How many numbers with a digit ‚6‛ are there?",
      "questionVn": "Number: Số; Without repetition: Không lặp lại; Two-digit number: Số có 2 chữ số; Digit: Chữ số.  50 KỲ THI OLYMPIC TOÁN HỌC QUỐC TẾ TIMO (Thailand International Mathematical Olympiad) FERMAT Education: Số 6A1 tiểu khu Ngọc Khánh, Ba Đình, Hà Nội – 0917830455 / 02466572055 Email: olympic.fermat@gmail.com ĐÁP ÁN THAM KHẢO PRELIMINARY ROUND / VÒNG LOẠI QUỐC GIA",
      "imageUrl": "/images/timo/grade2/final5/q25.png",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "A",
      "optionImages": [
        "/images/timo/grade2/final5/q25_A.png",
        "/images/timo/grade2/final5/q25_B.png",
        "/images/timo/grade2/final5/q25_C.png",
        "/images/timo/grade2/final5/q25_D.png"
      ]
    }
  ]
]
  },
  3: {
    preliminary: [[]],
    heat: [[]]
  },
  4: {
    preliminary: [[]],
    heat: [[]]
  },
  5: {
    preliminary: [[]],
    heat: [[]]
  }
};

export function getTimoTest(grade: number, round: TimoRound, testIndex: number): TimoQuestion[] {
  return TIMO_DATA[grade]?.[round]?.[testIndex] || [];
}

export function getTimoTestCount(grade: number, round: TimoRound): number {
  return TIMO_DATA[grade]?.[round]?.length || 0;
}

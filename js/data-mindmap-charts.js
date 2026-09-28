/**
 * Dữ liệu Mindmap 5W1H & Nguồn trích dẫn học thuật cho Trang 2: "AI & Nguy Cơ Mất Việc Làm"
 * Nguồn: WEF Future of Jobs 2025, Goldman Sachs Research, IMF, McKinsey Global Institute, ILO, Challenger Gray & Christmas, UBS/Visual Capitalist.
 * BẢO TOÀN 100% NỘI DUNG, SỐ LIỆU VÀ ĐƯỜNG DẪN NGUỒN.
 */
window.SRC = {
  wef:{t:'WEF – Future of Jobs Report 2025',u:'https://www.weforum.org/publications/the-future-of-jobs-report-2025/'},
  gs:{t:'Goldman Sachs Research (03/2023)',u:'https://www.goldmansachs.com/insights/articles/generative-ai-could-raise-global-gdp-by-7-percent'},
  imf:{t:'IMF Blog (01/2024)',u:'https://www.imf.org/en/blogs/articles/2024/01/14/ai-will-transform-the-global-economy-lets-make-sure-it-benefits-humanity'},
  mck:{t:'McKinsey Global Institute (07/2023)',u:'https://www.mckinsey.com/mgi/our-research/generative-ai-and-the-future-of-work-in-america'},
  mck2:{t:'McKinsey – Economic potential of generative AI (06/2023)',u:'https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier'},
  ilo:{t:'ILO – GenAI & việc làm tại Việt Nam',u:'https://www.ilo.org/vi/resource/tin-t%E1%BB%A9c/generative-ai-could-transform-millions-jobs-viet-nam-new-ilo-brief-shows'},
  cg:{t:'Challenger, Gray & Christmas – Job Cuts Report',u:'https://www.challengergray.com/blog/'},
  vc:{t:'UBS / Visual Capitalist',u:'https://www.visualcapitalist.com/threads-100-million-users/'}
};

window.ROOT = {
  tag:'VẤN ĐỀ', title:'AI & NGUY CƠ MẤT VIỆC LÀM', color:'#38bdf8',
  detail:{
    desc:'Nhận định khởi đề: “Hiện nay với sự phát triển AI, tôi nghĩ vài năm tới nhiều cơ hội việc làm sẽ mất.” Mindmap này mổ xẻ nhận định bằng 6 câu hỏi 5W1H, mỗi nhánh kèm số liệu kiểm chứng từ các tổ chức quốc tế.',
    stats:[
      {v:'22%',l:'việc làm hiện nay sẽ bị xáo trộn vào 2030 (WEF 2025)'},
      {v:'+78 triệu',l:'việc làm ròng tăng thêm đến 2030 (170 triệu mới − 92 triệu mất)'}
    ],
    sources:['wef']
  }
};

window.BRANCHES = [
{ id:'what', tag:'WHAT', q:'Chuyện gì?', title:'Chuyện gì đang xảy ra?', color:'#38bdf8', side:'right', slot:0,
  detail:{desc:'AI tạo sinh (ChatGPT, Gemini, Copilot...) và tự động hóa đang đảm nhận những tác vụ trước đây cần con người: trả lời khách hàng, viết nội dung, dịch thuật, viết code, nhập liệu, kế toán cơ bản. Bản chất không chỉ là "mất việc" mà là TÁI CƠ CẤU thị trường lao động.',
    stats:[{v:'22%',l:'việc làm hiện tại bị xáo trộn vào 2030 (WEF 2025)'},{v:'60–70%',l:'thời gian làm việc của nhân viên có thể được tự động hóa bởi gen AI (McKinsey)'}],
    sources:['wef','mck2']},
  children:[
    {label:'AI tạo sinh & tự động hóa thay thế trực tiếp công việc của con người',
     detail:{desc:'Chatbot chăm sóc khách hàng, AI viết nội dung – dịch thuật – lập trình, phần mềm RPA trong kế toán – văn phòng: máy móc thực hiện nhiệm vụ từng cần con người, với chi phí biên gần như bằng 0.',
       stats:[{v:'60–70%',l:'thời gian làm việc hiện nay có thể tự động hóa bởi generative AI (McKinsey 2023)'}],sources:['mck2']}},
    {label:'~300 triệu việc làm toàn cầu phơi nhiễm với tự động hóa bằng AI',
     detail:{desc:'Goldman Sachs ước tính generative AI có thể phơi nhiễm lượng công việc tương đương 300 triệu lao động toàn thời gian ở Mỹ và châu Âu; extrapolate toàn cầu cho con số tương tự.',
       stats:[{v:'300 triệu',l:'việc làm toàn cầu phơi nhiễm tự động hóa (Goldman Sachs 03/2023)'},{v:'+7%',l:'GDP toàn cầu có thể tăng thêm nhờ gen AI'}],sources:['gs']}},
    {label:'Bản chất: tái cơ cấu việc làm chứ không chỉ "mất đi"',
     detail:{desc:'WEF ghi nhận đến 2030 sẽ có 92 triệu việc làm mất đi nhưng 170 triệu việc làm mới sinh ra — ròng +78 triệu. Nghĩa là thị trường KHÔNG teo lại mà đổi cấu trúc rất nhanh.',
       stats:[{v:'−92 triệu / +170 triệu',l:'việc làm mất đi / tạo mới đến 2030 (WEF 2025)'},{v:'22%',l:'tỷ lệ việc làm hiện tại bị xáo trộn'}],sources:['wef']}},
    {label:'Quy mô: 40% việc làm toàn cầu phơi nhiễm với AI',
     detail:{desc:'IMF (01/2024): gần 40% việc làm toàn cầu thuộc nhóm nghề phơi nhiễm cao với AI; ở các nền kinh tế phát triển tỷ lệ là ~60%. Một nửa trong số đó có thể được AI hỗ trợ tích cực, nửa còn lại đối mặt nguy cơ bị thay thế.',
       stats:[{v:'40%',l:'việc làm toàn cầu phơi nhiễm AI (IMF 2024)'},{v:'60%',l:'tỷ lệ tương ứng ở nền kinh tế phát triển'}],sources:['imf']}}
  ]},
{ id:'why', tag:'WHY', q:'Vì sao?', title:'Vì sao điều này xảy ra?', color:'#a78bfa', side:'right', slot:1,
  detail:{desc:'Động lực kinh tế: AI rẻ hơn – nhanh hơn – bền bỉ hơn lao động con người ở các tác vụ lặp lại; doanh nghiệp chịu áp lực năng suất và lợi nhuận; tốc độ phổ cập công nghệ nhanh chưa từng có khiến quá trình thay thế diễn ra dồn dập.',
    stats:[{v:'+7% GDP',l:'động lực kinh tế khổng lồ thúc đẩy doanh nghiệp tự động hóa (Goldman Sachs)'},{v:'2 tháng',l:'ChatGPT đạt 100 triệu người dùng — phổ cập nhanh nhất lịch sử'}],
    sources:['gs','vc']},
  children:[
    {label:'AI rẻ hơn, nhanh hơn và làm việc 24/7 so với con người',
     detail:{desc:'Một mô hình AI đã huấn luyện có thể xử lý hàng triệu yêu cầu song song, không nghỉ phép, không bảo hiểm, không mệt mỏi. Chi phí biên cho mỗi tác vụ giảm liên tục theo giá compute.',
       stats:[{v:'24/7',l:'khả năng vận hành liên tục không chi phí nhân công biên'}],sources:[]}},
    {label:'Áp lực năng suất & lợi nhuận đẩy doanh nghiệp tự động hóa',
     detail:{desc:'Generative AI được McKinsey ước tính tạo thêm 2,6–4,4 nghìn tỷ USD giá trị mỗi năm; Goldman Sachs dự báo GDP toàn cầu +7%. Lợi ích quá lớn khiến tự động hóa là xu hướng khó đảo ngược.',
       stats:[{v:'2,6–4,4 nghìn tỷ USD/năm',l:'giá trị generative AI có thể bổ sung cho kinh tế toàn cầu (McKinsey 2023)'},{v:'+7%',l:'GDP toàn cầu dài hạn (Goldman Sachs)'}],sources:['mck2','gs']}},
    {label:'Tốc độ phổ cập công nghệ nhanh chưa từng có',
     detail:{desc:'ChatGPT đạt 100 triệu người dùng chỉ sau ~2 tháng (TikTok cần ~9 tháng, Instagram ~30 tháng). Công nghệ thấm vào doanh nghiệp càng nhanh thì tác động lên việc làm đến càng sớm.',
       stats:[{v:'2 tháng',l:'để ChatGPT chạm 100 triệu người dùng (UBS)'},{v:'5 ngày',l:'kỷ lục sau này của Threads — cho thấy tốc độ lan tỏa của ứng dụng AI'}],sources:['vc']}},
    {label:'Công nghệ hội tụ: LLM + AI agent + robot học theo cấp số nhân',
     detail:{desc:'Mô hình ngôn ngữ lớn kết hợp agent tự hành và robot học giúp AI không chỉ "nói" mà còn "làm": duyệt web, thao tác phần mềm, điều khiển dây chuyền — mở rộng phạm vi nghề bị tác động.',
       stats:[{v:'30%',l:'giờ làm việc tại Mỹ có thể tự động hóa vào 2030 nhờ gen AI (McKinsey)'}],sources:['mck']}}
  ]},
{ id:'who', tag:'WHO', q:'Ai?', title:'Ai chịu tác động?', color:'#f472b6', side:'right', slot:2,
  detail:{desc:'Nhóm phơi nhiễm cao nhất là lao động tác nghiệp lặp lại (văn phòng, hành chính, ngân hàng, nhập liệu). Nhưng khác các cuộc cách mạng trước, AI tạo sinh chạm cả lao động trí thức – sáng tạo. Phụ nữ và người trẻ chịu tác động lệch pha.',
    stats:[{v:'24,1% vs 17,8%',l:'nữ vs nam lao động Việt Nam trong ngành chịu tác động GenAI (ILO)'},{v:'6,1%',l:'việc làm thanh niên toàn cầu thuộc ngành chịu tác động mạnh (ILO)'}],
    sources:['ilo']},
  children:[
    {label:'Nhân viên văn phòng – hành chính (clerical) rủi ro cao nhất',
     detail:{desc:'WEF 2025 xếp nhóm suy giảm nhanh nhất đến 2030 gồm: nhân viên bưu chính, giao dịch viên ngân hàng, nhân viên nhập liệu, thu ngân & bán vé — đều là nghề tác nghiệp lặp lại.',
       stats:[{v:'Top 4 suy giảm',l:'bưu chính, giao dịch viên, nhập liệu, thu ngân (WEF 2025)'}],sources:['wef']}},
    {label:'Lao động trí thức & sáng tạo không còn "vùng an toàn"',
     detail:{desc:'Viết lách, dịch thuật, marketing, thiết kế, lập trình sơ cấp... đều bị AI tạo sinh chạm tới. Goldman Sachs ước tính tới ~25% công việc tại Mỹ có thể được tự động hóa bởi AI.',
       stats:[{v:'~25%',l:'công việc tại Mỹ phơi nhiễm tự động hóa (Goldman Sachs 2023)'}],sources:['gs']}},
    {label:'Phụ nữ chịu tác động lớn hơn nam giới',
     detail:{desc:'Theo ILO, tại Việt Nam tỷ lệ lao động nữ làm trong ngành nghề chịu tác động của GenAI là 24,1%, cao hơn hẳn mức 17,8% của nam giới — do phụ nữ tập trung nhiều ở nghề văn phòng, dịch vụ.',
       stats:[{v:'24,1% / 17,8%',l:'tỷ lệ nữ / nam phơi nhiễm GenAI tại Việt Nam (ILO)'}],sources:['ilo']}},
    {label:'Người trẻ: cửa vào nghề hẹp lại ở vị trí khởi đầu',
     detail:{desc:'ILO ước tính 6,1% việc làm do thanh niên 15–29 tuổi đảm nhiệm thuộc nhóm ngành chịu tác động mạnh từ AI. Khi việc "entry-level" bị tự động hóa, con đường tích lũy kinh nghiệm bị thu hẹp.',
       stats:[{v:'6,1%',l:'việc làm thanh niên trong ngành chịu tác động mạnh (ILO)'}],sources:['ilo']}}
  ]},
{ id:'when', tag:'WHEN', q:'Khi nào?', title:'Diễn ra khi nào?', color:'#fbbf24', side:'left', slot:0,
  detail:{desc:'Tác động KHÔNG phải chuyện tương lai xa: sa thải viện dẫn AI đã xuất hiện từ 2023 và tăng tốc; đỉnh tái cơ cấu dự báo quanh 2030; sau đó lan sang các nghề phức tạp hơn khi mô hình mạnh lên.',
    stats:[{v:'>27.000',l:'việc làm Mỹ bị cắt do AI trong 2024–2025 (Challenger, Gray & Christmas)'},{v:'2030',l:'mốc đỉnh của tái cơ cấu lao động theo WEF & McKinsey'}],
    sources:['cg','wef','mck']},
  children:[
    {label:'Đang diễn ra: làn sóng sa thải viện dẫn AI từ 2023',
     detail:{desc:'Challenger, Gray & Christmas ghi nhận hơn 27.000 việc làm Mỹ bị cắt do AI trong 2024–2025; riêng tháng 5/2026 AI là lý do số 1 với 38.579 ca cắt giảm (~40% tổng số tháng), tháng thứ 3 liên tiếp.',
       stats:[{v:'>27.000',l:'việc làm Mỹ bị cắt do AI giai đoạn 2024–2025'},{v:'38.579 (~40%)',l:'ca cắt giảm trong tháng 5/2026 — AI dẫn đầu lý do'}],sources:['cg']}},
    {label:'Đến 2030: đỉnh tái cơ cấu lao động toàn cầu',
     detail:{desc:'WEF dự báo 92 triệu việc làm bị thay thế vào 2030; McKinsey ước tính tới 30% giờ làm việc tại Mỹ có thể tự động hóa vào mốc này nhờ gen AI.',
       stats:[{v:'92 triệu',l:'việc làm bị thay thế vào 2030 (WEF 2025)'},{v:'30%',l:'giờ làm việc tại Mỹ tự động hóa được vào 2030 (McKinsey)'}],sources:['wef','mck']}},
    {label:'Sau 2030: lan sang nghề phức tạp hơn',
     detail:{desc:'Khi mô hình mạnh lên và AI agent trưởng thành, phạm vi tác động mở rộng từ tác nghiệp lặp lại sang phân tích, ra quyết định, sáng tác — các nghề từng được coi là "khó thay thế".',
       stats:[{v:'22%',l:'việc làm hiện tại bị xáo trộn trong giai đoạn 2025–2030 (WEF)'}],sources:['wef']}},
    {label:'Tốc độ: nhanh hơn mọi cuộc cách mạng công nghiệp trước',
     detail:{desc:'Hơi nước, điện, internet cần hàng chục năm để phổ cập; ChatGPT đạt 100 triệu người dùng trong ~2 tháng. Thị trường lao động không còn nhiều thập kỷ để thích nghi như trước.',
       stats:[{v:'2 tháng vs 30 tháng',l:'ChatGPT so với Instagram để đạt 100 triệu người dùng'}],sources:['vc']}}
  ]},
{ id:'where', tag:'WHERE', q:'Ở đâu?', title:'Tác động ở đâu?', color:'#34d399', side:'left', slot:1,
  detail:{desc:'Phơi nhiễm tập trung ở ngành nhiều tác vụ lặp lại và ở các nền kinh tế có cơ cấu việc làm văn phòng lớn. Việt Nam — trung tâm outsourcing — chịu tác động đáng kể ở mảng văn phòng, nội dung, IT gia công.',
    stats:[{v:'60%',l:'việc làm ở nền kinh tế phát triển phơi nhiễm AI (IMF)'},{v:'20,8%',l:'việc làm Việt Nam phơi nhiễm GenAI (~11,5 triệu lao động, ILO)'}],
    sources:['imf','ilo']},
  children:[
    {label:'Ngành rủi ro cao: sản xuất, CSKH, nội dung, outsourcing, tài chính',
     detail:{desc:'Các ngành dày đặc tác vụ lặp lại: dây chuyền sản xuất, tổng đài chăm sóc khách hàng, sản xuất nội dung – truyền thông, IT gia công, kế toán – kiểm toán – ngân hàng.',
       stats:[{v:'5 nhóm ngành',l:'được các báo cáo WEF/IMF xếp phơi nhiễm cao nhất'}],sources:['wef','imf']}},
    {label:'Nước phát triển phơi nhiễm cao nhất: ~60% việc làm',
     detail:{desc:'IMF: nền kinh tế phát triển ~60% việc làm phơi nhiễm; thị trường mới nổi ~40%; nước thu nhập thấp ~26%. Nghịch lý: nơi càng hiện đại, tỷ lệ phơi nhiễm càng cao nhưng cũng sẵn sàng hưởng lợi hơn.',
       stats:[{v:'60% / 40% / 26%',l:'phơi nhiễm AI ở nhóm nước phát triển / mới nổi / thu nhập thấp (IMF)'}],sources:['imf']}},
    {label:'Việt Nam: 20,8% việc làm phơi nhiễm GenAI ≈ 11,5 triệu người',
     detail:{desc:'Báo cáo ILO: khoảng 20,8% việc làm tại Việt Nam (≈11,5 triệu lao động) thuộc ngành chịu tác động của GenAI; tuy nhiên chỉ ~1,8% có nguy cơ bị thay thế trực tiếp — phần lớn là biến đổi cách làm việc.',
       stats:[{v:'20,8%',l:'việc làm Việt Nam phơi nhiễm GenAI (ILO)'},{v:'~1,8%',l:'có nguy cơ bị thay thế trực tiếp'}],sources:['ilo']}},
    {label:'Vùng an toàn tương đối: nghề phi cấu trúc, chăm sóc, sáng tạo đỉnh cao',
     detail:{desc:'Nghề đòi hỏi thao tác thủ công phi cấu trúc (thợ điện, thợ sửa), tương tác cảm xúc (y tế, giáo dục, tâm lý), sáng tạo nguyên bản và trách nhiệm pháp lý cao vẫn khó bị thay thế trong thập kỷ tới.',
       stats:[{v:'Kỹ năng "AI-proof"',l:'tư duy phản biện, cảm xúc xã hội, sáng tạo — nhóm kỹ năng tăng giá trị nhanh nhất (WEF)'}],sources:['wef']}}
  ]},
{ id:'how', tag:'HOW', q:'Như thế nào?', title:'Diễn ra & ứng phó ra sao?', color:'#f87171', side:'left', slot:2,
  detail:{desc:'Cơ chế thay thế đi theo 3 bậc: tự động hóa nhiệm vụ → bổ trợ con người → thay thế cả vị trí. Ứng phó hiệu quả là reskilling/upskilling ở cả 3 cấp: cá nhân, doanh nghiệp, nhà nước.',
    stats:[{v:'59%',l:'lao động cần đào tạo lại trước 2030 (WEF)'},{v:'1 tỷ người',l:'mục tiêu reskilling của sáng kiến Reskilling Revolution (WEF)'}],
    sources:['wef']},
  children:[
    {label:'Cơ chế: tự động hóa nhiệm vụ → bổ trợ → thay thế vị trí',
     detail:{desc:'Ban đầu AI làm thay từng tác vụ (viết email, nhập liệu); sau đó thành "trợ lý" tăng năng suất; khi đủ tin cậy, doanh nghiệp bỏ hẳn vị trí chuyên làm tác vụ đó. Sa thải vì thế đến muộn hơn nhưng dồn dập.',
       stats:[{v:'3 bậc tác động',l:'nhiệm vụ → vai trò → vị trí việc làm'}],sources:[]}},
    {label:'Cá nhân: reskilling – upskilling, xây kỹ năng "AI-proof"',
     detail:{desc:'WEF: 59/100 người lao động cần đào tạo lại trước 2030. Học kỹ năng dùng AI (prompt, đánh giá đầu ra), cộng với tư duy phản biện, giao tiếp, sáng tạo — thứ AI chưa thay được.',
       stats:[{v:'59%',l:'lao động cần reskilling/upskilling trước 2030 (WEF 2025)'}],sources:['wef']}},
    {label:'Doanh nghiệp: đào tạo lại nội bộ & bố trí lại nhân lực',
     detail:{desc:'Trong 59 người cần đào tạo, ~29 người có thể upskill để giữ nguyên vị trí nếu doanh nghiệp đầu tư đào tạo; số còn lại cần chuyển nghề có hỗ trợ. Đào tạo lại rẻ và nhân văn hơn sa thải hàng loạt.',
       stats:[{v:'29/100',l:'người lao động có thể upskill tại chỗ (WEF 2025)'}],sources:['wef']}},
    {label:'Nhà nước & xã hội: cải cách giáo dục, an sinh, học tập suốt đời',
     detail:{desc:'WEF đặt mục tiêu reskilling 1 tỷ người đến 2030 (Reskilling Revolution). Chính sách cần: cập nhật chương trình giáo dục, tín chỉ đào tạo lại, lưới an sinh cho người chuyển nghề.',
       stats:[{v:'1 tỷ người',l:'mục tiêu được đào tạo lại đến 2030 (WEF Reskilling Revolution)'}],sources:['wef']}}
  ]}
];

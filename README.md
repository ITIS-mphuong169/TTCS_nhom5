# TTCS_nhom5

Ứng dụng Bert4Rec trong dự đoán bài tập trên CodePTIT và so sánh với SASRec.
BERT4Rec (Bidirectional Transformer for Sequential Recommendation)
Công nghệ chính: Sử dụng Transformer bidirectional giống BERT để mô hình hóa trình tự bài tập đã làm của người dùng.
Ưu điểm: Học ngữ cảnh hai chiều, hiểu rõ hơn về thứ tự bài tập, cải thiện dự đoán bài tập tiếp theo.
Thư viện: RecBole hỗ trợ huấn luyện và đánh giá BERT4Rec dễ dàng.

SASRec (Self-Attention Sequential Recommendation)
Công nghệ chính: Transformer self-attention (một chiều) để học thứ tự bài tập theo thời gian.
Ưu điểm: Đơn giản hơn BERT4Rec, nhưng chỉ học theo hướng từ quá khứ → tương lai.

*So sánh BERT4Rec vs SASRec

Tiêu chí
BERT4Rec
SASRec
Mô hình hóa trình tự
Hai chiều (bidirectional)
Một chiều (unidirectional)
Hiệu suất dự đoán
Tốt hơn trên tập dữ liệu lớn	
Tốt trên dữ liệu tuần tự ngắn
Độ phức tạp tính toán
Cao hơn (O(n²))	
Thấp hơn
Ứng dụng
Dự đoán chính xác hơn, phù hợp với hệ thống lớn
Đơn giản, nhanh hơn, phù hợp với dataset nhỏ
Kết luận: 
BERT4Rec phù hợp hơn nếu có dữ liệu bài tập lớn và cần mô hình mạnh.
SASRec đơn giản hơn, phù hợp nếu chỉ cần gợi ý nhanh mà không cần mô hình hóa sâu.


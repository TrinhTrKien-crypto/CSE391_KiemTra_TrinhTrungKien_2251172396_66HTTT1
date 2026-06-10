// Đợi DOM load hoàn tất
document.addEventListener("DOMContentLoaded", () => {
  const recordsContainer = document.getElementById("recordsContainer");
  const totalBadge = document.getElementById("totalBadge");
  const filterButtons = document.querySelectorAll(".btn-filter");
  const recordForm = document.getElementById("recordForm");

  let currentFilter = "Tất cả";

  // Hàm render danh sách hồ sơ
  function renderRecords() {
    recordsContainer.innerHTML = "";
    
    // Lọc dữ liệu theo tab đang chọn
    const filteredRecords = records.filter(item => {
      if (currentFilter === "Tất cả") return true;
      return item.status === currentFilter;
    });

    // Cập nhật số lượng hiển thị trên Badge
    totalBadge.innerHTML = `<i class="fa-solid fa-list-ul me-2"></i>${filteredRecords.length} hồ sơ`;

    if (filteredRecords.length === 0) {
      recordsContainer.innerHTML = `<div class="text-center text-muted my-4">Không có hồ sơ nào thuộc trạng thái này.</div>`;
      return;
    }

    // Lặp qua dữ liệu tạo HTML
    filteredRecords.forEach(item => {
      let borderClass = "border-secondary-custom";
      let statusClass = "status-secondary";
      let iconClass = "fa-clock";

      if (item.status === "Hoàn thành") {
        borderClass = "border-success-custom";
        statusClass = "status-success";
        iconClass = "fa-circle-check";
      } else if (item.status === "Đang triển khai") {
        borderClass = "border-warning-custom";
        statusClass = "status-warning";
        iconClass = "fa-circle-dot";
      }

      const cardHtml = `
        <div class="record-card ${borderClass} p-4 shadow-sm d-flex flex-column gap-2">
          <div class="d-flex justify-content-between align-items-start flex-wrap gap-2">
            <h3 class="h5 fw-bold mb-0 text-dark">
              <i class="fa-solid fa-school text-secondary me-2"></i>${item.schoolName}
            </h3>
            <span class="status-badge ${statusClass}">
              <i class="fa-solid ${iconClass} me-1"></i>${item.status}
            </span>
          </div>
          <div class="text-secondary small">
            <i class="fa-solid fa-location-dot me-2"></i>${item.managementUnit}
          </div>
          <p class="mb-0 text-muted small mt-1" style="text-align: justify;">
            ${item.description}
          </p>
        </div>
      `;
      recordsContainer.insertAdjacentHTML("beforeend", cardHtml);
    });
  }

  // Xử lý sự kiện nhấn vào các Tab Bộ lọc
  filterButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      e.target.classList.add("active");
      currentFilter = e.target.getAttribute("data-filter");
      renderRecords();
    });
  });

  // Xử lý sự kiện Submit Form (Thêm mới dữ liệu vào mảng tạm thời)
  recordForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const schoolName = document.getElementById("schoolName").value.trim();
    const managementUnit = document.getElementById("managementUnit").value;
    const status = document.getElementById("status").value;
    const description = document.getElementById("description").value.trim();

    // Validate nhanh dữ liệu đầu vào
    if (!schoolName || !managementUnit || !status || !description) {
      alert("Vui lòng điền đầy đủ thông tin hồ sơ!");
      return;
    }

    // Tạo object mới đẩy vào mảng
    const newRecord = {
      id: records.length + 1,
      schoolName,
      managementUnit,
      status,
      description
    };

    records.unshift(newRecord); // Thêm lên đầu danh sách
    recordForm.reset();         // Reset form nhập
    renderRecords();            // Re-render lại giao diện
  });

  // Chạy render lần đầu tiên khi mở trang
  renderRecords();
});
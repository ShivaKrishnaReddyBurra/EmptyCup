document.addEventListener('DOMContentLoaded', () => {
  const designersList = document.getElementById('designers-list');
  const shortlistFilter = document.getElementById('shortlist-filter');
  let designers = [];
  let shortlistedIds = new Set(JSON.parse(localStorage.getItem('shortlistedIds') || '[]'));

  // Fetch designers from API
  async function fetchDesigners() {
    try {
      const response = await fetch('http://localhost:5000/api/designers');
      if (!response.ok) throw new Error('Failed to fetch designers');
      designers = await response.json();
      renderDesigners();
    } catch (error) {
      console.error('Error fetching designers:', error);
      // Fallback to static JSON
      fetch('designers.json')
        .then(response => response.json())
        .then(data => {
          designers = data;
          renderDesigners();
        })
        .catch(err => console.error('Error fetching static JSON:', err));
    }
  }

  // Render stars for rating
  function renderStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5; // Show half star for decimals >= 0.5
    const totalStars = 5;
  
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars += '<span class="star-filled">★</span>';
    }
  
    // Add half star if applicable
    if (hasHalfStar) {
      stars += '<span class="star-half">★</span>'; // Using ★ as placeholder; CSS will handle half-fill
    }
  
    // Add empty stars
    const remainingStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars += '<span class="star-empty">☆</span>';
    }
  
    return stars;
  }

  // Render designers list
  function renderDesigners() {
    const filteredDesigners = shortlistFilter.classList.contains('active')
      ? designers.filter(designer => shortlistedIds.has(designer.id))
      : designers;

    designersList.innerHTML = filteredDesigners.map(designer => `
     <div class="designer-card" style="background-color: ${shortlistedIds.has(designer.id) ? '#FFFCF2' : '#FFFFFF'};">
        <div class="designer-card-left">
            <div class="designer-header">
            <div class="designer-info">
                <h2>${designer.name}</h2>
                ${designer.rating > 0 ? `<div class="stars">${renderStars(designer.rating)}</div>` : ''}
            </div>
            </div>
            ${designer.description ? `<p class="description">${designer.description}</p>` : ''}
            ${designer.projects > 0 ? `
            <div class="stats">
                <div class="stat-item">
                <div class="stat-value">${designer.projects}</div>
                <div class="stat-label">Projects</div>
                </div>
                <div class="stat-item">
                <div class="stat-value">${designer.years}</div>
                <div class="stat-label">Years</div>
                </div>
                <div class="stat-item">
                <div class="stat-value">${designer.priceLevel}</div>
                <div class="stat-label">Price</div>
                </div>
            </div>
            ` : ''}
            ${designer.phone1 ? `
            <div class="contact-info">
                <div>${designer.phone1}</div>
                <div>${designer.phone2}</div>
            </div>
            ` : ''}
        </div>
        <div class="vertical-line"></div>
        <div class="header-right">
              
              <button class="action-btn details-btn">
                <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M0.75 4.99989C0.75 4.81756 0.825725 4.64269 0.960517 4.51376C1.09531 4.38483 1.27813 4.31239 1.46875 4.31239H9.79619L6.70988 1.36164C6.57491 1.23255 6.49909 1.05746 6.49909 0.874892C6.49909 0.692326 6.57491 0.517236 6.70988 0.388142C6.84484 0.259048 7.02788 0.186523 7.21875 0.186523C7.40962 0.186523 7.59266 0.259048 7.72762 0.388142L12.0401 4.51314C12.1071 4.577 12.1602 4.65287 12.1964 4.7364C12.2326 4.81992 12.2513 4.90946 12.2513 4.99989C12.2513 5.09032 12.2326 5.17986 12.1964 5.26339C12.1602 5.34691 12.1071 5.42278 12.0401 5.48664L7.72762 9.61164C7.59266 9.74074 7.40962 9.81326 7.21875 9.81326C7.02788 9.81326 6.84484 9.74074 6.70988 9.61164C6.57491 9.48255 6.49909 9.30746 6.49909 9.12489C6.49909 8.94233 6.57491 8.76724 6.70988 8.63814L9.79619 5.68739H1.46875C1.27813 5.68739 1.09531 5.61496 0.960517 5.48603C0.825725 5.3571 0.75 5.18223 0.75 4.99989Z" fill="#8D4337"/>
                </svg>
                <span class="action-label">Details</span>
              </button>
              <button class="action-btn hide-btn" data-id="${designer.id}">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_12_497)">
                    <path d="M16.6988 14.0475C18.825 12.15 20 10 20 10C20 10 16.25 3.125 10 3.125C8.7995 3.12913 7.61258 3.37928 6.51251 3.86L7.47501 4.82375C8.28431 4.52894 9.1387 4.3771 10 4.375C12.65 4.375 14.8488 5.835 16.46 7.44625C17.2355 8.22586 17.9306 9.08141 18.535 10C18.4625 10.1087 18.3825 10.2288 18.2913 10.36C17.8725 10.96 17.2538 11.76 16.46 12.5538C16.2538 12.76 16.0388 12.9637 15.8138 13.1613L16.6988 14.0475Z" fill="#8D4337"/>
                    <path d="M14.1212 11.47C14.4002 10.6898 14.4518 9.84639 14.2702 9.03798C14.0886 8.22957 13.6811 7.48936 13.0952 6.90348C12.5093 6.3176 11.7691 5.91013 10.9607 5.72849C10.1523 5.54685 9.30893 5.59851 8.52874 5.87745L9.55749 6.9062C10.0379 6.83745 10.5277 6.88151 10.9881 7.03491C11.4485 7.18831 11.8668 7.44682 12.21 7.78997C12.5531 8.13312 12.8116 8.55147 12.965 9.01187C13.1184 9.47227 13.1625 9.96207 13.0937 10.4425L14.1212 11.47ZM10.4425 13.0937L11.47 14.1212C10.6898 14.4001 9.84642 14.4518 9.03801 14.2702C8.2296 14.0885 7.48939 13.6811 6.90351 13.0952C6.31763 12.5093 5.91016 11.7691 5.72852 10.9607C5.54688 10.1523 5.59854 9.3089 5.87749 8.5287L6.90624 9.55745C6.83748 10.0378 6.88154 10.5276 7.03494 10.988C7.18834 11.4484 7.44685 11.8668 7.79 12.2099C8.13315 12.5531 8.5515 12.8116 9.0119 12.965C9.4723 13.1184 9.9621 13.1625 10.4425 13.0937Z" fill="#8D4337"/>
                    <path d="M4.1875 6.83762C3.9625 7.03762 3.74625 7.24012 3.54 7.44637C2.76456 8.22598 2.0694 9.08153 1.465 10.0001L1.70875 10.3601C2.1275 10.9601 2.74625 11.7601 3.54 12.5539C5.15125 14.1651 7.35125 15.6251 10 15.6251C10.895 15.6251 11.7375 15.4589 12.525 15.1751L13.4875 16.1401C12.3874 16.6208 11.2005 16.8709 10 16.8751C3.75 16.8751 0 10.0001 0 10.0001C0 10.0001 1.17375 7.84887 3.30125 5.95262L4.18625 6.83887L4.1875 6.83762ZM17.0575 17.9426L2.0575 2.94262L2.9425 2.05762L17.9425 17.0576L17.0575 17.9426Z" fill="#8D4337"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_12_497">
                      <rect width="20" height="20" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
                <span class="action-label">Hide</span>
              </button>
              <button class="action-btn shortlist-btn" data-id="${designer.id}">
                <svg width="18" height="21" viewBox="0 0 18 21" fill="${shortlistedIds.has(designer.id) ? '#8D4337' : 'none'}" stroke="${shortlistedIds.has(designer.id) ? 'none' : '#8D4337'}" stroke-width="${shortlistedIds.has(designer.id) ? '0' : '1'}" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.92436e-07 20.3438C-9.11286e-05 20.4577 0.0323215 20.5697 0.0940478 20.6688C0.155774 20.7678 0.244686 20.8505 0.352032 20.9086C0.459377 20.9668 0.581456 20.9984 0.706251 21.0004C0.831046 21.0024 0.954255 20.9746 1.06375 20.9199L8.625 17.1531L16.1863 20.9199C16.2957 20.9746 16.419 21.0024 16.5437 21.0004C16.6685 20.9984 16.7906 20.9668 16.898 20.9086C17.0053 20.8505 17.0942 20.7678 17.156 20.6688C17.2177 20.5697 17.2501 20.4577 17.25 20.3438V2.625C17.25 1.92881 16.9471 1.26113 16.4079 0.768845C15.8688 0.276562 15.1375 0 14.375 0L2.875 0C2.1125 0 1.38124 0.276562 0.842068 0.768845C0.302901 1.26113 1.92436e-07 1.92881 1.92436e-07 2.625V20.3438ZM8.625 5.78813C10.6188 3.91781 15.6026 7.1925 8.625 11.4017C1.64738 7.1925 6.63119 3.91913 8.625 5.79075V5.78813Z"/>
                </svg>
                <span class="action-label">Shortlist</span>
              </button>
              <button class="action-btn report-btn" data-id="${designer.id}">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_12_371)">
                    <path d="M8 15C6.14348 15 4.36301 14.2625 3.05025 12.9497C1.7375 11.637 1 9.85652 1 8C1 6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1C9.85652 1 11.637 1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8C15 9.85652 14.2625 11.637 12.9497 12.9497C11.637 14.2625 9.85652 15 8 15ZM8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16Z" fill="#8D4337"/>
                    <path d="M7.00201 11C7.00201 10.8687 7.02788 10.7386 7.07813 10.6173C7.12839 10.496 7.20205 10.3857 7.29491 10.2929C7.38777 10.2 7.49801 10.1264 7.61933 10.0761C7.74066 10.0259 7.87069 10 8.00201 10C8.13334 10 8.26337 10.0259 8.3847 10.0761C8.50602 10.1264 8.61626 10.2 8.70912 10.2929C8.80198 10.3857 8.87564 10.496 8.92589 10.6173C8.97615 10.7386 9.00201 10.8687 9.00201 11C9.00201 11.2652 8.89666 11.5196 8.70912 11.7071C8.52158 11.8946 8.26723 12 8.00201 12C7.7368 12 7.48244 11.8946 7.29491 11.7071C7.10737 11.5196 7.00201 11.2652 7.00201 11ZM7.10001 4.995C7.0867 4.86884 7.10005 4.74129 7.13921 4.62062C7.17838 4.49996 7.24247 4.38888 7.32733 4.29458C7.4122 4.20029 7.51594 4.12489 7.63183 4.07328C7.74771 4.02167 7.87315 3.995 8.00001 3.995C8.12687 3.995 8.25232 4.02167 8.3682 4.07328C8.48409 4.12489 8.58783 4.20029 8.6727 4.29458C8.75756 4.38888 8.82165 4.49996 8.86081 4.62062C8.89998 4.74129 8.91333 4.86884 8.90001 4.995L8.55001 8.502C8.53825 8.63977 8.47522 8.76811 8.37337 8.86163C8.27152 8.95515 8.13829 9.00705 8.00001 9.00705C7.86174 9.00705 7.7285 8.95515 7.62666 8.86163C7.52481 8.76811 7.46177 8.63977 7.45001 8.502L7.10001 4.995Z" fill="#8D4337"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_12_371">
                      <rect width="16" height="16" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
                <span class="action-label">Report</span>
              </button>
          </div>
      </div>
    `).join('');
  }

  // Toggle shortlist
  function toggleShortlist(designerId) {
    if (shortlistedIds.has(designerId)) {
      shortlistedIds.delete(designerId);
    } else {
      shortlistedIds.add(designerId);
      
    }
    localStorage.setItem('shortlistedIds', JSON.stringify([...shortlistedIds]));
    renderDesigners();
  }

  // Toggle shortlist filter
  shortlistFilter.addEventListener('click', () => {
    shortlistFilter.classList.toggle('active');
    shortlistFilter.querySelector('.nav-icon-wrapper').classList.toggle('active');
    renderDesigners();
  });

  // Handle action buttons
  designersList.addEventListener('click', (e) => {
    const btn = e.target.closest('.shortlist-btn');
    if (btn) {
      const designerId = btn.dataset.id;
      toggleShortlist(designerId);
    }

  });

  // Initial fetch
  fetchDesigners();
});
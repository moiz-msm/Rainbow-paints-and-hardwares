// 	----------------------------------------------------------
    $(document).ready(function() {				
		//only select 10 max
		updateSelectedCount();
		
        var postId; // Variable to store the selected post ID
        var selectedColor;

		var current_pagecolors = "#f4e569"; // Parse PHP value into JavaScript
		console.log(current_pagecolors);
        applyGradient(current_pagecolors);
		
        //applyGradient("#f06a36");

        // On clicking the refresh icon, randomly pick a color and apply gradient
        $('#refreshIcon').click(function() {
            console.log('refreshIcon click');
            var randomColor = colors[Math.floor(Math.random() * colors.length)];
            // Update the color name in the banner text
            $('#colorName').text(randomColor.name);
            console.log(randomColor.name);
            console.log(randomColor.code);
            applyGradient(randomColor.code);
        });		

        $('.category-header').click(function() {
            $(this).toggleClass('active');
            $(this).next('.category-content').slideToggle();
        });

        $('.selected-colours').hide();

        // Object to store selected colors across parents
        let selectedColors = {};
		
        // Handle parent color click
        $('.parentcolorname').on('click', function(e) {
            e.preventDefault();
            const termId = $(this).data('term-id');
            const colorcode = $(this).data('colorcode');
            const colorname = $(this).data('colorname');
            $("#colorID").val(termId);

            applyGradient(colorcode);

            // Remove the 'active' class from all items
            $('.parentcolorname').removeClass('active');

            // Add the 'active' class to the clicked item
            $(this).addClass('active');

            // Update the color name in the banner text
            if (colorname !== 'all') {
                // Update the color name in the banner text
                $('#colorName').text(colorname);
            }

        });

        // Handle child color selection
        $(document).on('change', '.select-color', function() {
            $('.selected-colours').show();
            const colorId = $(this).data('color-id');
            const colorName = $(this).data('color-name');
            const colorCode = $(this).data('colorcode');
            const isChecked = $(this).is(':checked');
			const alturacode = $(this).data('alturacode');
			
            // Update the selectedColors object
            if (isChecked) {
                $('#selected-colors-list').show();
                // Update the count

                selectedColors[colorId] = true; // Mark as selected
                $('#selected-colors-list').append(`
                <div class="selected-color-item col-md-3" data-color-id="${colorId}" style="background-color:${colorCode};">
					<div class="dinfo">
                    <p class="name">${colorName}</p>
					<p class="alt">ALTURA: ${alturacode}</p>
					</div>
					<i class="close-icon fa fa-times" aria-hidden="true"></i> 
                </div>
            `);

                // Add to My Selected Colours section
                $('.my-selected .category-content').append(`
            <label class="checkbox-label"><input type="checkbox" class="selected-color-checkbox" data-color-id="${colorId}" checked> ${colorName}</label>

        `);
                updateSelectedCount();
            } else {

                delete selectedColors[colorId]; // Remove from selected
                $(`.selected-color-item[data-color-id="${colorId}"]`).remove();

                // Remove from My Selected Colours section
                $('.my-selected .selected-color-checkbox[data-color-id="' + colorId + '"]').closest('.checkbox-label').remove();
                updateSelectedCount();
            }

            if ($('#selected-colors-list').children().length === 0) {
                $('#selected-colors-list').hide();
                updateSelectedCount();
            }

            // Add empty placeholders to reach a total of 10 columns
            const selectedCount = $('#selected-colors-list .selected-color-item').length;
            const maxCount = 10;
            const emptyCount = maxCount - selectedCount;

            // Clear previous empty placeholders
            $('.empty-placeholder').remove();

            // Append empty placeholders
            for (let i = 0; i < emptyCount; i++) {
                $('#selected-colors-list').append(`
        <div class="empty-placeholder col-md-3" style="border: 1px dotted #ccc; height: 50px; display: flex; align-items: center; justify-content: center;">
            <span></span>
        </div>
    `);
            }


        });


        // Function to update the selected count
        function updateSelectedCount() {
            // Count how many selected color items there are
            const selectedCount = $('#selected-colors-list .selected-color-item').length;
			  //console.log(selectedCount);
            const maxCount = 10; // Assuming you have a limit of 10 selections

           $('#selected-count').text(`${selectedCount}/${maxCount}`);

            // Optionally, you could hide or disable the selection if the max count is reached
            if (selectedCount >= maxCount) {
				 // Update the count in the span
                console.log(selectedCount);
                $('.childcolorname input.select-color').prop('disabled', true); // Disable further selection if max is reached
            } 
			if (selectedCount < maxCount){
				 // Update the count in the span            
                $('.childcolorname input.select-color').prop('disabled', false); // Enable selection if under the max count
            }
        }

        // Handle removing a selected color item when clicking the close icon
        $(document).on('click', '.close-icon', function() {

            const colorId = $(this).closest('.selected-color-item').data('color-id');

            // Remove from the selected colors object
            delete selectedColors[colorId];

            // Remove the color item from the list
            $(this).closest('.selected-color-item').remove();

            // Uncheck the corresponding checkbox
            $(`.select-color[data-color-id="${colorId}"]`).prop('checked', false);

            // Remove from "My Selected Colours" section if applicable
            $('.my-selected .selected-color-checkbox[data-color-id="' + colorId + '"]').closest('.checkbox-label').remove();

            // Update the count after removal
            updateSelectedCount();

			   // Add empty placeholders to reach a total of 10 columns
            const selectedCount = $('#selected-colors-list .selected-color-item').length;
            const maxCount = 10;
            const emptyCount = maxCount - selectedCount;

            // Clear previous empty placeholders
            $('.empty-placeholder').remove();

            // Append empty placeholders
            for (let i = 0; i < emptyCount; i++) {
                $('#selected-colors-list').append(`
        <div class="empty-placeholder col-md-3" style="border: 1px dotted #ccc; height: 50px; display: flex; align-items: center; justify-content: center;">
            <span></span>
        </div>
    `);
            }
        });


        // Handle color removal from selected list
        $(document).on('click', '.remove-color', function() {
            const colorId = $(this).data('color-id');
            $(`input.select-color[data-color-id="${colorId}"]`).prop('checked', false).trigger('change');
            updateSelectedCount();
        });

        // Automatically activate the first parent color name on page load
        $('.parentcolorname').first().trigger('click');



        // filter by colors
        function loadColors() {
            console.log('loadColors-----------')
            $.ajax({
                url: 'https://www.mrfpaint.com/wp-admin/admin-ajax.php',
                type: 'POST',
                data: {
                    action: 'get_colour_catalogue',
                    post_id: postId
                },
                success: function(response) {
                    $('#color-list').empty();
                    if (response.success) {
                        $('#color-list').html(response.data); // Replace content with response data

                        $('#color-display-area').hide();
                    } else {
                        console.error('Error:', response.message);
                    }
                },
                error: function() {
                    console.error('AJAX request failed');
                }
            });
        }


        // Load filtered results based on selected product and color
        function loadFilteredResults() {
            console.log('loadFilteredResults-----------')
            console.log('product id ' + postId);
            console.log('parent color id ' +  $("#colorID").val());
            $.ajax({
                url: 'https://www.mrfpaint.com/wp-admin/admin-ajax.php',
                type: 'POST',
                data: {
                    action: 'get_filtered_results',
                    post_id: postId,
                    color:  $("#colorID").val()
                },
                success: function(response) {
                    $('#color-display-area').hide();
                    //console.log(response);
                    if (response.success) {
                        $('#color-list').html(response.data); // Show filtered results
                    } else {
                        console.error('Error:', response.message);
                    }
                },
                error: function(e) {
                    console.error('AJAX request failed', e);
                }
            });
        }

    });

   // colors load and chnage function
   function selectedColorPalates(id) {	 
	
        $("#seletedColorPalatId").val(id);
        $("#startId").val(0);
        loadFilteredColors();
           $("#color-list").removeAttr('disabled', 'disabled')
                        $("#color-list").html('Load more')
	   const selectedCount = $('#selected-colors-list .selected-color-item').length;
            const maxCount = 10; 
            if (selectedCount >= maxCount) {
                $('.childcolorname input.select-color').prop('disabled', true);
            } 
	     //  updateSelectedCount();
	      // Clean ID for URL
    let cleanId = id.toLowerCase().split('&')[0].trim().replace(/\s+/g, '-');
	       // Redirect to the color-specific page
    window.location.href = '/wall-paint-colors-catalog/' + cleanId + '-colour-wall-paint/';
	   
    }

    function selectedProducts(id) {		  
        $("#selectedProductId").val(id);
        $("#startId").val(0);
        $("#color-list").removeAttr('disabled', 'disabled')
                        $("#color-list").html('Load more')
        loadFilteredColors();
		const selectedCount = $('#selected-colors-list .selected-color-item').length;
            const maxCount = 10; 
            if (selectedCount >= maxCount) {
                $('.childcolorname input.select-color').prop('disabled', true);
            } 
	//	updateSelectedCount();
    }

    function selectedColorShades(id) {		 
		const selectedCount = $('#selected-colors-list .selected-color-item').length;
            const maxCount = 10; 
            if (selectedCount >= maxCount) {
                $('.childcolorname input.select-color').prop('disabled', true);
            } 
        $("#selectedColorShadesId").val(id);
	//	updateSelectedCount();
    }

    function loadmore() {
        var colorPalatId = $("#seletedColorPalatId").val();
        var productId = $("#selectedProductId").val();
        var start = $("#startId").val();
	//	console.log("--loadmore--"); 
	//	console.log(colorPalatId); 
	//	console.log(productId); 
	//	console.log(start); 
        $.ajax({
            url: '/wp-content/themes/MRF/fetch_colors.php',
            type: 'post',
            data: {
                colorPalatId: colorPalatId,
                productId: productId,
                start: start,
            },
            beforeSend: function() {
                $("#color-list").attr('disabled', 'disabled')
                $("#color-list").html('loading...')
            },
              success: function(res) {
                res = JSON.parse(res);
                console.log(res);
                var count = res.count;
                if (count == 0) {
                    var countofpreviousCards = document.querySelectorAll(".childcolorname");
                    if (countofpreviousCards.length > 0) {
                        $("#color-list").attr('disabled', 'disabled')
                        $("#color-list").html('No more colours found.')
                    } else {
                        $("#color-display-area").html('No colours found.');
                    }
                }
                if (count < 32) {
                    $("#color-list").attr('disabled', 'disabled')
                      $("#color-list").html('No more colours found.')
                }
                if (count > 0) {
                    $("#color-list").removeAttr('disabled', 'disabled')
                    $("#color-list").html('Load more')
                    var colorsCard = $("#color-display-area").html();
                    for (var i = 0; i < count; i++) {
                       	colorsCard += `	<div class="col-md-3 color-card ${colorPalatId}" id="color-card-${res.colors_info[i].color_shade_id}">
    <div class="childcolorname infoshow-wrapper single-checkbox " style="background-color:${res.colors_info[i].color_rgb};">
        <div class="checks">
            <!-- Info Show Checkbox -->
            <input type="checkbox" 
				   id="infoshow"
				   class="infoshow-${res.colors_info[i].color_shade_id}"
                   data-color-id="${res.colors_info[i].color_shade_id}" 
                   data-color-name="${res.colors_info[i].color_shade_name}" 
                   data-colorcode="${res.colors_info[i].color_rgb}" 
				   data-alturacode="${res.colors_info[i].color_shade_code}"
				  style="display:none;">        
            <!-- Select Color Checkbox -->
            <input type="checkbox" 
                   id="myCheckbox" 
                   class="select-color" 
                   data-color-id="${res.colors_info[i].color_shade_id}" 
                   data-color-name="${res.colors_info[i].color_shade_name}" 
                   data-colorcode="${res.colors_info[i].color_rgb}"
				   data-alturacode="${res.colors_info[i].color_shade_code}"
 title="Add to my selected colours">
        </div>
   <div class="datainfo">
    <p class="colorname">${res.colors_info[i].color_shade_name}</p>
    <p><span class="altura_text">ALTURA: ${res.colors_info[i].color_shade_code}</span></p>
</div>
</div></div></div>`;
                    };
                    $("#color-display-area").html(colorsCard);
                    $("#startId").val(res.colors_info[count - 1].color_shade_id);
                }
            },
            error: function(e) {
                console.log(e)
                $("#color-display-area").html('Error in loading colors!')
            }
        });
    }

    function loadFilteredColors() {
		
		var colorPalatId = "";
    	colorPalatId = $("#seletedColorPalatId").val();
		console.log('colorid: '+colorPalatId);

				if(colorPalatId == 0) {
			colorPalatId = "Yellow";
		}
			
		console.log('colorid: '+colorPalatId);
		
     //   var colorPalatId = $("#seletedColorPalatId").val();
        var productId = $("#selectedProductId").val();
        var start = $("#startId").val();
		
		console.log("color"+colorPalatId);
		console.log("productId"+productId);
		console.log("start"+start);
		
		$.ajax({
            url: '/wp-content/themes/MRF/fetch_colors.php',
            type: 'post',
            data: {
                colorPalatId: colorPalatId,
                productId: productId,
                start: start,
            },
            beforeSend: function() {
                $("#color-list").hide();
                $("#color-display-area").html('loading...')
            },
             success: function(res) {
                res = JSON.parse(res);
				console.log('res'+res);
                var count = res.count;
                if (count == 0) {
                    $("#color-list").hide();
                    $("#color-display-area").html('No colors found.');
                }
                if (count > 0) {
                    $("#color-list").show();
                    var colorsCard = '';
                    for (var i = 0; i < count; i++) {			
						colorsCard += `	<div class="col-md-3 color-card ${colorPalatId}" id="color-card-${res.colors_info[i].color_shade_id}">
    <div class="childcolorname infoshow-wrapper single-checkbox" style="background-color:${res.colors_info[i].color_rgb};">
        <div class="checks">
            <!-- Info Show Checkbox -->
            <input type="checkbox" 
				   id="infoshow"
				   class="infoshow-${res.colors_info[i].color_shade_id}"
                   data-color-id="${res.colors_info[i].color_shade_id}" 
                   data-color-name="${res.colors_info[i].color_shade_name}" 
                   data-colorcode="${res.colors_info[i].color_rgb}"
					data-alturacode="${res.colors_info[i].color_shade_code}"
					style="display:none;">        
            <!-- Select Color Checkbox -->
            <input type="checkbox" 
                   id="myCheckbox" 
                   class="select-color" 
                   data-color-id="${res.colors_info[i].color_shade_id}" 
                   data-color-name="${res.colors_info[i].color_shade_name}" 
                   data-colorcode="${res.colors_info[i].color_rgb}"
				   data-alturacode="${res.colors_info[i].color_shade_code}"
 title="Add to my selected colours">
        </div>
   <div class="datainfo">
    <p class="colorname">${res.colors_info[i].color_shade_name}</p>
    <p><span class="altura_text">ALTURA: ${res.colors_info[i].color_shade_code}</span></p>
</div>
</div></div></div>`;
                    };
                    $("#color-display-area").html(colorsCard);
                    $("#startId").val(res.colors_info[count - 1].color_shade_id);
                }
				 const selectedCount = $('#selected-colors-list .selected-color-item').length;
					const maxCount = 10; 
					if (selectedCount >= maxCount) {
						$('.childcolorname input.select-color').prop('disabled', true);
					} 
            },
            error: function(e) {
                console.log(e)
                $("#color-display-area").html('Error in loading colors!')
            }
        });
    }

    function loadFilterWithCategory() {
        $.ajax({
            url: '/wp-content/themes/MRF/colors-filter.php',
            type: 'post',
            beforeSend: function() {
                $("#product-type-filters").html('loading...')
            },
            success: function(res) {
                res = JSON.parse(res);
                console.log(res);
                var count = res.count;
                var categoryStr = '';
                const groupedProducts = new Map();
                // Group products by product_category_name
                res.category_info.forEach(({
                    product_id,
                    product_name,
                    product_category_name
                }) => {
                    if (!groupedProducts.has(product_category_name)) {
                        // If the category doesn't exist, add it with an empty array
                        groupedProducts.set(product_category_name, []);
                    }
                    // Add the product_name to the array for this category
                    groupedProducts.get(product_category_name).push({
                        "product_name": product_name,
                        "product_id": product_id
                    });
                });

                // Convert the Map to a standard object (optional)
                const groupedProductsObj = Object.fromEntries(groupedProducts);

				 categoryStr += `<div class="category">
                                <div class="category-header">Colour Tones</div>
                                `;
				
                groupedProducts.forEach((key, category) => {
                    var dummyStr = '';
                    console.log(key);
                    for (var i = 0; i < key.length; i++) {
                        dummyStr += `<label class="radio-label">
                                        <input type="radio" name="product-selection" class="post-radio" onclick="selectedProducts('${key[i].product_id}')" data-post-id="${key[i].product_id}"> ${key[i].product_name} </label>`;
                    }
					  categoryStr += `<div class="category-content">
                                   ${dummyStr}
                                </div> `;
                });
				categoryStr += `</div>`;
				
                categoryStr += `<div class="category my-selected">
                                <div class="category-header">My Selected Colours</div>
                                <div class="category-content">

                                </div>
                            </div>`;
                $("#product-type-filters").html(categoryStr)
            },
            error: function(err) {
                console.log(err);
            }

        })
    }
    loadFilterWithCategory();
    loadFilteredColors();
    //banner color

    function adjustBrightness(color, amount) {
        let r, g, b;

        // Check if color is in hex format
        if (color[0] === "#") {
            color = color.slice(1); // Remove '#'

            // Convert hex to RGB
            const num = parseInt(color, 16);
            r = (num >> 16);
            g = (num >> 8) & 0x00FF;
            b = num & 0x0000FF;
        }
        // Check if color is in RGB or RGBA format
        else if (color.startsWith("rgb")) {
            // Extract the r, g, b values
            const rgbValues = color.match(/\d+/g);
            if (!rgbValues || rgbValues.length < 3) {
                throw new Error("Unsupported color format");
            }
            r = parseInt(rgbValues[0]);
            g = parseInt(rgbValues[1]);
            b = parseInt(rgbValues[2]);
        } else {
            throw new Error("Unsupported color format");
        }

        // Adjust each color component
        r = Math.min(255, Math.max(0, r + amount));
        g = Math.min(255, Math.max(0, g + amount));
        b = Math.min(255, Math.max(0, b + amount));

        // Return adjusted color in the same format as the input
        if (color[0] === "#") {
            // Convert RGB back to hex
            return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
        } else {
            // Return RGB format
            return `rgb(${r}, ${g}, ${b})`;
        }
    }

    function applyGradient(mainColor) {
        // Generate five shades: very dark, dark, main color, light, and very light
        const veryDarkShade = adjustBrightness(mainColor, -80);
        const darkShade = adjustBrightness(mainColor, -40);
        const lightShade = adjustBrightness(mainColor, 40);
        const veryLightShade = adjustBrightness(mainColor, 80);

        // Apply the gradient with jQuery
        $("#gradientBox").css("background",
            `linear-gradient(to right, ${veryDarkShade}, ${darkShade}, ${mainColor}, ${lightShade}, ${veryLightShade})`
        );
    }
    // infoshow
    $(document).on('click', '#infoshow', function() {
        const colorId = $(this).data('color-id');
        const colorName = $(this).data('color-name');
        const colorcode = $(this).data('colorcode');
		 const alturacode = $(this).data('alturacode');

        // console.log( $('#color-detail-view').html());
        // Show the detail view

        // $('#color-detail-view').html();
        if ($(`#color-detail-view-${colorId}`).length) {
            $(`#color-detail-view-${colorId}`).remove();
            $("#color-card-" + colorId).css('width', '');
            $(this).attr('checked', false); // Uncheck the checkbox
			$("#color-card-link-"+colorId).css("width","");
			$(".infoshow-" + colorId).attr('checked', false).hide();
			$(".infoshow-wrapper").removeClass('two-checkbox showactive');
			console.log('unchecked hide');
        } else {
            $(".color-detail-box").remove();
            $(".color-card").css('width', '');
            $("#infoshow").attr('checked', false);
            $(this).attr('checked', true); // Uncheck the checkbox
            $("#color-card-" + colorId).css('width', '100%');

            $('#color-card-' + colorId).html($('#color-card-' + colorId).html() + `<div id="color-detail-view-${colorId}" " style="padding-bottom:20px">
             <div class="color-detail-box row" style="width:100%;">
                <div class="color-detail-image col-md-7" >	
				<div class="infobox-slider swiper">
					<div class="swiper-wrapper">
						<div class="swiper-slide">
									<a href="/wp-content/uploads/2025/01/Interior_House_1.png" 
									data-lightbox="color-slider" 
									data-title="Color Image 2" 
									data-background-color="${colorcode}">
									<img src="/wp-content/uploads/2025/01/Interior_House_1.png" 
									style="background-color:${colorcode}" 
									alt="Color Image 2" />
										</a>
								</div>
								  <div class="swiper-slide">
										 <a href="/wp-content/uploads/2025/01/Exterior_House_1.png" 
									   data-lightbox="color-slider" 
									   data-title="Color Image 3" 
									   data-background-color="${colorcode}">
										<img src="/wp-content/uploads/2025/01/Exterior_House_1.png" 
											 style="background-color:${colorcode}" 
											 alt="Color Image 3" />
									</a>
										</div>
									</div>
									<div class="swiper-button-next"></div>
									<div class="swiper-button-prev"></div>
									<div class="swiper-pagination"></div>
								</div>
                                    </div>
                                    <div class="color-detail-info col-md-5">
                                        <h4 id="color-name">${colorName}</h4>
<p class="alturacode">ALTURA : ${alturacode}</p>
                                        <button class="close-detail-view" onclick="closeColorExample(${colorId})"><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"></path>
                                            </svg>
                                        </button>
<div class="bothbtn">
                                        <a href="/find-a-dealer"><button class="find-dealer">Find A Dealer</button></a>
                                        <a href="/contact-us"><button class="get-in-touch">Get In Touch</button></a>
</div>
                                    </div>
                                </div>
                            </div>`);
$("#detail-image").css("width","100%");
$("#color-card-link-"+colorId).css("width","25%");
        }

		 const infoslider1= new Swiper('.infobox-slider', {
        slidesPerView: 1, // Show 1 slide at a time
        spaceBetween: 30, // Space between slides
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });		
		
    });


    function closeColorExample(colorid) {
        $("#color-detail-view-" + colorid).remove();
		$("#color-card-link-"+colorid).css("width","");
        $(".color-card").css('width', '');
		$(".infoshow-"+colorid).attr('checked', false);
		$(".infoshow-"+colorid).hide();
		$('.infoshow-wrapper').removeClass('two-checkbox');	
    }
	
 $(document).on('click', '.infoshow', function() {
   const colorId = $(this).data('color-id');
        const colorName = $(".infoshow-"+colorId).data('color-name');
        const colorcode = $(".infoshow-"+colorId).data('colorcode');
	  const alturacode = $(".infoshow-"+colorId).data('alturacode');

        // $('#color-detail-view').html();
        if ($(`#color-detail-view-${colorId}`).length) {

            $(`#color-detail-view-${colorId}`).remove();
            $("#color-card-" + colorId).css('width', '');
            $(".infoshow-"+colorId).attr('checked', false); // Uncheck the checkbox
			$(".infoshow").css("width","100%");
			$(".infoshow-" + colorId).attr('checked', false).hide();
			$(".infoshow-wrapper").removeClass('two-checkbox showactive');
			console.log('unchecked hide');
        }
	 else {
			$("[id='infoshow']").removeAttr('checked');
			$(".infoshow").css("width","100%");
			console.log('unchecked hide');
            $(".color-detail-box").remove();
            $(".color-card").css('width', '');
          
            $(".infoshow-"+colorId).attr('checked', true);
            $("#color-card-" + colorId).css('width', '100%');

            $('#color-card-' + colorId).html($('#color-card-' + colorId).html() + `<div id="color-detail-view-${colorId}" " style="padding-bottom:20px">
                                <div class="color-detail-box row" style="width:100%;">
                                    <div class="color-detail-image col-md-7" >
			  
						<div class="infobox-slider swiper">
							<div class="swiper-wrapper">
								<div class="swiper-slide">
									 <a href="/wp-content/uploads/2025/01/Interior_House_1.png" 
										   data-lightbox="color-slider" 
										   data-title="Color Image 2" 
										   data-background-color="${colorcode}">
											<img src="/wp-content/uploads/2025/01/Interior_House_1.png" 
												 style="background-color:${colorcode}" 
												 alt="Color Image 2" />
										</a>
								</div>
						  <div class="swiper-slide">
								 <a href="/wp-content/uploads/2025/01/Exterior_House_1.png" 
							   data-lightbox="color-slider" 
							   data-title="Color Image 3" 
							   data-background-color="${colorcode}">
								<img src="/wp-content/uploads/2025/01/Exterior_House_1.png" 
									 style="background-color:${colorcode}" 
									 alt="Color Image 3" />
							</a>
								</div>
							</div>
							<div class="swiper-button-next"></div>
							<div class="swiper-button-prev"></div>
							<div class="swiper-pagination"></div>
						</div>


                                    </div>
                                    <div class="color-detail-info col-md-5">
                                        <h4 id="color-name">${colorName}</h4>
										<p class="alturacode">ALTURA : ${alturacode}</p>
                                        <button class="close-detail-view" onclick="closeColorExample(${colorId})"><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"></path>
                                            </svg>
                                        </button>
<div class="bothbtn">
                                        <a href="/find-a-dealer"><button class="find-dealer">Find A Dealer</button></a>
                                        <a href="/contact-us"><button class="get-in-touch">Get In Touch</button></a>
</div>
                                    </div>
                                </div>
                            </div>`);

       
$("#detail-image").css("width","100%");
$("#color-card-link-"+colorId).css("width","25%");
        }

	 const infoslider= new Swiper('.infobox-slider', {
        slidesPerView: 1, // Show 1 slide at a time
        spaceBetween: 30, // Space between slides
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
	 	 
    });

	
$(document).ready(function () {
	
    // Handle infoshow-wrapper click
    $(document).on('click', '.infoshow-wrapper .datainfo', function (e) {
        e.stopPropagation(); // Stop event propagation

        // Add a class to the wrapper when clicked
        var wrapper = $(this).closest('.infoshow-wrapper');
		
		 // Hide and reset all other wrappers except the current one
    $('.infoshow-wrapper').not(wrapper).each(function () {
        var otherWrapper = $(this);
        var otherCheckbox = otherWrapper.find('#infoshow');

        otherCheckbox.prop('checked', false).hide(); // Uncheck and hide other checkboxes
        otherWrapper.removeClass('two-checkbox showactive'); // Remove classes
		 console.log('Other Hide checked');
    });
		
		 // Add a class to the current wrapper when clicked
        wrapper.addClass('two-checkbox');		 
		
        // Find the checkbox inside this wrapper by ID
        var checkbox = wrapper.find('#infoshow');

        // Toggle checkbox visibility and checked state
        if (!checkbox.is(':visible')) {
            checkbox.prop('checked', true).show(); // Check and show the checkbox
			wrapper.addClass('showactive');
            const colorId = checkbox.data('color-id');
            const colorName = checkbox.data('color-name');
            const colorCode = checkbox.data('colorcode');
            console.log(`Show info for Color ID: ${colorId}, Name: ${colorName}, Code: ${colorCode}`);
            // Add logic to display color details here
			
        } 
		else {
            checkbox.prop('checked', false).hide(); // Uncheck and hide the checkbox
			  $('[id="infoshow"]').prop('checked', false).hide(); // Uncheck and hide all instances
            console.log('Hide info');
            wrapper.removeClass('two-checkbox');
			wrapper.removeClass('showactive');	
			
        }

        // Debug log for wrapper click
        console.log('Wrapper clicked!');
		
        // Trigger the click event on the #infoshow checkbox inside this wrapper
        checkbox.trigger('click');
    });
});

	$(document).on('click', '.infobox-slider .swiper-slide a', function (e) {
    e.preventDefault(); // Prevent the default link behavior

    // Get the image source and background color from the clicked element
    const colorCode = $(this).data('background-color');
    console.log('Background Color:', colorCode);

//    Update the modal content dynamically
    $('#myModal .modal-image').css('background-color', colorCode);

    // Open the modal
    $('#myModal').modal('show');
});

	 // Close the modal when the close button is clicked
    $('.close').on('click', function () {
        $('#myModal').modal('hide'); // Hide the modal
    });
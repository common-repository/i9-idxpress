// JavaScript Document
var $ = jQuery;
jQuery().ready(function($) {

	
	// login or register show/hide code
	$('.regshow').click(function(e) {
        $('#regdiv').show();
		$('#logindiv').hide();
		$('#forgotdiv').hide();
    });
	
	$('.loginshow').click(function(e) {
        $('#regdiv').hide();
		$('#logindiv').show();
		$('#forgotdiv').hide();
    });

    $('#forgot_pwd').click(function(){
    	$('#regdiv').hide();
		$('#logindiv').hide();
		$('#forgotdiv').show();
    })
	
	// contact form
	$('#contactForm').submit(function(e) {
		e.preventDefault(); //STOP default action
		$('#cont_err').html('');
		var postData = $(this).serializeArray();
		checklogin(function(e){
			if(e){
				var patAlf=/^[A-Za-z\s]+$/;
				var fname = $('#cont_firstName').val().trim();
				if(!fname.match(patAlf)){
					$('#cont_err').html('Please Fill Correct FirstName');
		        	$('#cont_firstName').val('');
		            $('#cont_firstName').focus();
		            return false;
		        }
		        var lname = $('#cont_lastName').val().trim();
		        if(!lname.match(patAlf)){
		        	$('#cont_err').html('Please Fill Correct LastName');
		        	$('#cont_lastName').val('');
		            $('#cont_lastName').focus();
		            return false;
		        }
		        var mno = $('#cont_phone').val().trim();
				if(mno.length != 10 || isNaN(mno) || Number(mno) == 0  || mno.charAt(0)==0){
					$('#cont_err').html('Please Fill Correct Mobile No');
					$('#cont_phone').val('');$('#cont_phone').focus();
					return false;
				}
		        var pat=/^[a-zA-Z]+[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/;
		        var email = $('#cont_email').val().trim();
		        if(!email.match(pat)){
		        	$('#cont_err').html('Please Fill Correct Email');
		        	$('#cont_email').val('');
		            $('#cont_email').focus();
		            return false;
		        }
				
				var pluginUrl = locali9idx.pluginUrl;
				var formURL = pluginUrl + 'client-assist.php?action=Contact';
				//console.log(postData);return false;
			
				$.ajax({
					url : formURL,
					type: "POST",
					dataType: "JSON",
					data : postData,
					success:function(data, textStatus, jqXHR){ 
						if(data == 0){
							$('#cont_err').html('Please Fill Correct Email');
							$('#cont_email').val('');
		            		$('#cont_email').focus();
							//$('#loginModal').modal('show');
						} else {
							$('#cont_err').html('Request Send Successfully').css('color','green');
							setTimeout(function(){
								$("#contactForm")[0].reset();
							},1000);
						}
						setTimeout(function () {
							$('#cont_err').html('').css('color','red');
						},2000);
					},
					error: function(jqXHR, textStatus, errorThrown) 
					{
						//if fails      
					}
				});
				
			} else {
				$("#contactForm")[0].reset();
				$('#loginModal').modal({backdrop: 'static', keyboard: false});
			}
		})
				
	});
	
	// listing email 
	$('#emaillistingForm').submit(function(e) { 
		e.preventDefault(); //STOP default action
		$('#email_err').html('');
		var postData = $(this).serializeArray();
		checklogin(function(e){
			if(e){
				var pat=/^[a-zA-Z]+[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/;
		        var email = $('#email_from').val().trim();
		        if(!email.match(pat)){
		        	$('#email_err').html('Please Fill Correct Email');
		        	$('#email_from').val('');
		            $('#email_from').focus();
		            return false;
		        }
		        var email2 = $('#email_to').val().trim();
		        if(!email2.match(pat)){
		        	$('#email_err').html('Please Fill Correct Email');
		        	$('#email_to').val('');
		            $('#email_to').focus();
		            return false;
		        }

				var pluginUrl = locali9idx.pluginUrl;
				var formURL = pluginUrl + 'client-assist.php?action=EmailListing';
				
				$.ajax({
					url : formURL,
					type: "POST",
					dataType: "JSON",
					data : postData,
					success:function(data, textStatus, jqXHR){
						if(data == 0){
							$('#email_err').html('Entered Email Not Registered');
							$('#email_from').val('');
		            		$('#email_from').focus();
							//$('#loginModal').modal('show');
						} else {
							$('#email_err').html('Mail Send Successfully').css('color','green');
							
							setTimeout(function(){
								$("#emaillistingForm")[0].reset();
								$('#cannysys-share-email').hide();
							},1000);
						}
						setTimeout(function () {
							$('#email_err').html('').css('color','red');
						},2000);
					}
				});
			} else {
				$('#loginModal').modal({backdrop: 'static', keyboard: false});
			}
		}); 
		return false;
		
    });

    $('#loginModal').on('hidden.bs.modal',function(){
    	$("#regfrm")[0].reset();
		$('#reg_err').html('').css('color','red');
		$("#loginfrm")[0].reset();
		$('#login_err').html('');
		$('#forgot_err').html('');
		$("#forgotfrm")[0].reset();
		$('.forgot_send_btn').prop('disabled',false);
		$('#btnre2').attr("disabled",false);
		$('#regdiv').hide();
		$('#logindiv').show();
		$('#forgotdiv').hide();
    })
	
	// submit register form 
	$('#regfrm').submit(function(e) {
		$('#reg_err').html('');
		var patAlf=/^[A-Za-z\s]+$/;
		var fname = $('#fname').val().trim();
		if(!fname.match(patAlf)){
        	$('#reg_err').html('Please Fill Correct FirstName');
        	$('#fname').val('');
            $('#fname').focus();
            return false;
        }
        var lname = $('#lname').val().trim();
        if(!lname.match(patAlf)){
        	$('#reg_err').html('Please Fill Correct LastName');
        	$('#lname').val('');
            $('#lname').focus();
            return false;
        }
        var pat=/^[a-zA-Z]+[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/;
        var email = $('#emailid').val().trim();
        if(!email.match(pat)){
        	$('#reg_err').html('Please Fill Correct Email');
        	$('#emailid').val('');
            $('#emailid').focus();
            return false;
        }
		
		var mno = $('#mno').val().trim();
		if(mno.length != '10' || isNaN(mno) || Number(mno) == 0  || mno.charAt(0)==0){
			$('#reg_err').html('Please Fill Correct MobileNo');
			$('#mno').val('');$('#mno').focus();
			return false;
		}
		if($('#agree').prop('checked')!= true){
			$('#reg_err').html('Please Agree Our Terms & Conditions');
			return false;
		}
		
		var postData = $(this).serializeArray();
		var pluginUrl = locali9idx.pluginUrl;
		var formURL = pluginUrl + 'client-assist.php?action=Register';
		$('#btnre2').attr("disabled",true);
		$.ajax({
			url : formURL,
			type: "POST",
			dataType: "JSON",
			data : postData,
			success:function(data, textStatus, jqXHR){ 
				$('#btnre2').attr("disabled",false);
				if(data.leadId>0){
					localStorage.setLoginFlag = 1;
					$('#reg_err').html("Registered Successfullly, Please Check Your Email").css('color','green');
					$('.login_div').html('Logged as : <b id="loginName">'+data.leadName+'</b>');
					/*var top = setTopbuttons(data.savs,data.favs,data.srchs);
					$('.I9_topbuttons').html(top);*/
					$("#regfrm")[0].reset();
					/*setTimeout(function(){
					 	$('#loginModal').modal('hide');
					 	$('#reg_err').html('').css('color','red');
					},1000);*/
					window.location.reload();

				} else {
					localStorage.setLoginFlag = 0;
					$('#emailid').focus();
					$('#reg_err').html("Email Already Registered").css('color','red');
				}
					
			},
			error: function(jqXHR, textStatus, errorThrown) 
			{
				//if fails      
			}
		});
		e.preventDefault(); //STOP default action
        
    });
	
	// submit login form 
	$('#loginfrm').submit(function(e) {
		
		var postData = $(this).serializeArray();
		var pluginUrl = locali9idx.pluginUrl;
		var formURL = pluginUrl + 'client-assist.php?action=Login';
		
		$('#login_err').html('');
		$.ajax({
			url : formURL,
			type: "POST",
			dataType: "JSON",
			data : postData,
			success:function(data, textStatus, jqXHR){
				if(data.leadId>0){
					localStorage.setLoginFlag = 1;
					/*var top = setTopbuttons(data.savs,data.favs,data.srchs);
					$('.login_div').html('Logged as : <b id="loginName">'+data.leadName+'</b>');
					$('.I9_topbuttons').html(top);*/
				} else if(data == 1){
					$('#login_err').html('Please Enter Correct User Name');
					return false;
				} else if(data == 0){
					$('#login_err').html('Please Enter Correct Password');
					return false;
				} else {
					$('#login_err').html('Authentication Failed');
					return false;
				}
				window.location.reload();
				/*$("#loginfrm")[0].reset();
				setTimeout(function(){
					$('#login_err').html('');
					$('#loginModal').modal('hide');
				},800);*/
			},
			error: function(jqXHR, textStatus, errorThrown) 
			{
				//if fails      
			}
		});
		e.preventDefault(); //STOP default action
    });

    // forgot password form
    $('#forgotfrm').submit(function(e){
    	e.preventDefault();
    	$('#forgot_err').html('');
    	var mno = $('#uphone').val().trim();
		if(mno.length != '10' || isNaN(mno) || Number(mno) == 0  || mno.charAt(0)==0){
			$('#uphone').val('');$('#uphone').focus();
			return false;
		}
		var postData = $(this).serializeArray();
    	
		var pluginUrl = locali9idx.pluginUrl;
		var formURL = pluginUrl + 'client-assist.php?action=ForgotPwd';
		$('.forgot_send_btn').prop('disabled',true);
		$.ajax({
			url : formURL,
			type: "POST",
			dataType: "JSON",
			data : postData,
			success:function(res, textStatus, jqXHR){
				if(res==1){
					$('#forgot_err').html("Please Check Your Registered Email");
				} else if (res == 2) {
					$('#forgot_err').html("Request Not Submitted");
					return false;
				} else {
					$('#forgot_err').html("Please Submit Valid Credentials");
					return false;
				}
				$('.forgot_send_btn').prop('disabled',false);
				$("#forgotfrm")[0].reset();	
				setTimeout(function(){
					$('#forgot_err').html('');
					$('#loginModal').modal('hide');
				},1000)
			},
			error: function(jqXHR, textStatus, errorThrown) 
			{
				//if fails      
			}
		});
    })
	
	
	/// log out
	$('#logoutbtn').click(function(e) {
		Logout();
		// var pluginUrl = locali9idx.pluginUrl;
		// var formURL = pluginUrl + 'client-assist.php?action=Logout';
		// $.post(formURL,function(data){
		// 	if(data == '1'){
		// 		localStorage.setLoginFlag = 0;
		// 		localStorage.setIdxFlag = 0;
				
		// 		var dat = '<div class="col-xs-3 col-sm-3 first"><a data-target="#loginModal" id="loginbtn" data-toggle="modal" class="col-sm-2 loginbutton btn">Login</a></div>';
		// 		$('.I9_topbuttons').html(dat);
				
		// 	}
		// });

    });
	
	// favorites code
	checkfav();
	
	$('.favclass').click(function(e) {
		var key = $(this).data('id');
		if(key){
			changefav(key);
		}
		//$(this).children('span').css('color','#ed1e1e');
        e.preventDefault();
    });
	
	$('.fav').click(function(e) {
		var key = $(this).data('id');
		if(key){
			changefav(key);
		}
		e.preventDefault();
    });
	
	$('#favbtn').click(function(e) {
		
		//alert(locali9idx.homeUrl+'/canny/favorite');
		window.location = locali9idx.homeUrl+'/canny/favorite';
		
    });
	
	$('#savesearchModal').on('hidden.bs.modal',function(){
		$('#ss_err_span').html("").css('color','red');
		$('#savesearchfrm')[0].reset();
	})
	// save search functions
	$('#savesearchfrm').submit(function(e) { 
		e.preventDefault();
		$('#ss_err_span').html('');
		var patAlf = /^[A-Za-z\s]+$/;
		var patEmail = /^[a-zA-Z]+[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/;
		var name = $('#sname').val().trim();
		var email = $('#semail').val().trim();
		if(!name.match(patAlf)){
        	$('#ss_err_span').html('Please Fill Correct Name');
        	$('#sname').val('');
            $('#sname').focus();
            return false;
        }
        if(!email.match(patEmail)){
        	$('#ss_err_span').html('Please Fill Correct Email');
        	$('#semail').val('');
            $('#semail').focus();
            return false;
        }

		var postData = $(this).serializeArray();
		
		var pluginUrl = locali9idx.pluginUrl;
		var formURL = pluginUrl + 'client-assist.php?action=Savesearch';
		$('.ss_btn').prop('disabled',true);
		$.ajax({
			url : formURL,
			type: "POST",
			dataType: "JSON",
			data : postData,
			success:function(data, textStatus, jqXHR){
				$('.ss_btn').prop('disabled',false);
				if(data == '1'){
					$('#ss_err_span').html("Error Occured While Save This Search");
				} else if(data == '0') {
					$('#ss_err_span').html("Already A Search Saved With This Name");
				} else if(data == '2') {
					$('#loginModal').modal({backdrop: 'static', keyboard: false});
				} else {
					$('#ss_err_span').html("Saved Successfully").css('color','green');
					/*var top = setTopbuttons(data.length,$('#fav_count').html(),data);
					$('.I9_topbuttons').html(top);*/
				}
				window.location.reload();
				/*setTimeout(function(){
					$('#ss_err_span').html('').css('color','red');
					$("#savesearchfrm")[0].reset();
					$('#savesearchModal').modal('hide');
				},1000)*/
				
			},
			error: function(jqXHR, textStatus, errorThrown) 
			{
				//if fails      
			}
		});
    });
	
	$('#managebtn').click(function(e) {
       	setSavesearch();
		e.preventDefault();
    });
	
	
	/*$(".I9_item").mouseover(function(){
			
		$(this).find(".button1").css("display","block");
		$(this).find(".fav").css("display","block");
		
	});
	
	$(".I9_item").mouseout(function(){
	
		$(this).find(".button1").css("display","none");
		$(this).find(".fav").css("display","none");
		
	});
	
	$(".flimg").mouseover(function(){
			
		$(this).find(".button1").css("display","block");
		$(this).find(".fav").css("display","block");
		
	});
	
	$(".flimg").mouseout(function(){
	
		$(this).find(".button1").css("display","none");
		$(this).find(".fav").css("display","none");
		
	});*/
	
	// property detail function
	$('.button1').on('click',function(e) {
		//alert($(this).data('id'));
		var key = $(this).data('id');

		setcacheFlag(function(d){
			if(d!=0){
				var win = window.open(locali9idx.homeUrl+"/canny/lte-"+key, '_blank');
		  		win.focus();
				// window.location = locali9idx.homeUrl+"/canny/lte-"+key;	
			}
		}); // set flag to storage for login modal display
		
	});

	$('.chk_flag').click(function(){
		
		var link = $(this).data('id');

		setcacheFlag(function(d){
			if(d!=0){
				window.location = link;		
			}
		})
		
	})

	var dt = new Date();
	for(var j=0;j<dt.getMonth();j++){
		$("#cont_month option[value="+(j+1)+"]").hide();
	}
	$("#cont_month option[value="+(dt.getMonth()+1)+"]").attr('selected',true);

	$('#cont_month').on('change', function() {
	  	var val= this.value;
	 	var thirty="30";
	 	var thirtyone="31";

	 	for(var z=1;z<32;z++){
	 		$("#cont_day option[value="+z+"]").show();
	 	}

	 	if(val==4 || val==6 || val== 9 || val==11){
	  		$("#cont_day option[value="+thirty+"]").show();
	  		$("#cont_day option[value="+thirtyone+"]").hide();
	 	}
	 	if(val==1 || val==3 || val== 5 || val==7 || val==8 || val==10 || val==12){
	  		$("#cont_day option[value="+thirty+"]").show();
	  		$("#cont_day option[value="+thirtyone+"]").show();
	 	}
	 	if(val==2){
	  		$("#cont_day option[value="+thirty+"]").hide();
	  		$("#cont_day option[value="+thirtyone+"]").hide();
	  		
	  		if((dt.getFullYear()%4) == 0){
	  			$("#cont_day option[value=29]").show();
	  		} else {
	  			$("#cont_day option[value=29]").hide();
	  		}
	 	}

	 	checkDate();
	})	
	
	checkDate();
});

function checkfav(){

		var pluginUrl = locali9idx.pluginUrl;
		var keys = $('#arrlkey').val();
		$.ajax({
			url : pluginUrl+"client-assist.php?action=Checkfav",
			type: "POST",
			dataType: "JSON",
			data : { key : keys },
			success:function(data, textStatus, jqXHR){
				
				if(data != '2'){
					$('#loginbtn').hide();
					$('.logspan').show();
					$('#logoutbtn').show();
					$('#savesearchbtn').show();
					localStorage.setLoginFlag = 1;
					
				} else {
					$('#loginbtn').show();
					$('.logspan').hide();
					$('#logoutbtn').hide();
					$('#savesearchbtn').hide();
					localStorage.setLoginFlag = 0;
					setcacheFlag(function(d){});
				}
				if(typeof data !=='undefined'){
					$.each(data,function(k,val){
						if(val["status"]==1){
							$('#fav-'+val["key"]).css('color','#ed1e1e');
							$('#fav1-'+val["key"]).css('color','#ed1e1e');
						}else{
							$('#fav-'+val["key"]).css('color','#31708f');
							$('#fav1-'+val["key"]).css('color','#31708f');	
						}
					});
				}
				
			}
		});
		var keys1 = $('#arrlkey1').val();
		if(keys1){
			$.ajax({
				url : pluginUrl+"client-assist.php?action=Checkfav",
				type: "POST",
				dataType: "JSON",
				data : { key : keys1 },
				success:function(data, textStatus, jqXHR){
					
					$.each(data,function(k,val){
						if(val["status"]==1){
							$('#fav-'+val["key"]).css('color','#ed1e1e');
							$('#fav1-'+val["key"]).css('color','#ed1e1e');
						}else{
							$('#fav-'+val["key"]).css('color','#31708f');
							$('#fav1-'+val["key"]).css('color','#31708f');
						}
					});
					
				}
			});
		}
}
	
function changefav(key){
		
		var pluginUrl = locali9idx.pluginUrl;
		var formURL = pluginUrl + 'client-assist.php?action=Changefav';
		
		$.ajax({
			url : formURL,
			type: "POST",
			dataType: "JSON",
			data : { key : key },
			success:function(data, textStatus, jqXHR){ 
				var count = parseInt($('#fav_count').html());	
				if(data == '1'){
					//$('#favorite').children('span').css('color','#ed1e1e');
					$('#fav-'+key).css('color','#ed1e1e');
					$('#fav1-'+key).css('color','#ed1e1e');
					$('.fav1').css('color','#ed1e1e');
					$('#fav_count').html(count+1);
				}
				else if(data == '0'){
					//$('#favorite').children('span').css('color','#fff');
					$('#fav-'+key).css('color','#31708f');
					$('#fav1-'+key).css('color','#31708f');	
					$('.fav1').css('color','#31708f');
					$('#fav_count').html(count-1);
				}
				else{
					$('#loginModal').modal({backdrop: 'static', keyboard: false});
					//alert('login to add favorite');
				}
				
			},
			error: function(jqXHR, textStatus, errorThrown) 
			{
				//if fails      
			}
		});	
}

function checklogin(cb){
		var pluginUrl = locali9idx.pluginUrl;
		$.ajax({
			url : pluginUrl+"client-assist.php?action=Checklogin",
			type: "POST",
			dataType: "JSON",
			data : { },
			success:function(data, textStatus, jqXHR){
				if(data>0){
					cb(true);
				} else {
					cb(false);
				}
			}
		})
}

function checkDate(){
	var $ = jQuery;
	var dt = new Date();
	var mn = $('#cont_month').val();
	
	if(mn == (dt.getMonth()+1)){
		for(var j=1;j<dt.getDate();j++){
			$("#cont_day option[value="+j+"]").hide();
		}
		$("#cont_day option[value="+dt.getDate()+"]").attr('selected',true);
	}

	 	if(mn==4 || mn==6 || mn== 9 || mn==11){
	  		$("#cont_day option[value=30]").show();
	  		$("#cont_day option[value=31]").hide();
	 	}
	 	if(mn==1 || mn==3 || mn== 5 || mn==7 || mn==8 || mn==10 || mn==12){
	  		$("#cont_day option[value=30]").show();
	  		$("#cont_day option[value=31]").show();
	 	}
	 	if(mn==2){
	  		$("#cont_day option[value=30]").hide();
	  		$("#cont_day option[value=31]").hide();
	  		
	  		if((dt.getFullYear()%4) == 0){
	  			$("#cont_day option[value=29]").show();
	  		} else {
	  			$("#cont_day option[value=29]").hide();
	  		}
	 	}
}

function delsearch(id){
	
	var pluginUrl = locali9idx.pluginUrl;
	var formURL = pluginUrl + 'client-assist.php?action=Delsearch';
	jQuery.ajax({
			url : formURL,
			type: "POST",
			dataType: "JSON",
			data : { searchId : id },
			success:function(data, textStatus, jqXHR){
				if(data == '2'){
					$('#save_modal_err').html('Failed Your Request');
				} else {
					window.location.reload();
					/*var top = setTopbuttons(data.length,$('#fav_count').html(),data);
					$('.I9_topbuttons').html(top);
					$('#managesrchModal').modal('hide');
					$('#srch_load_span').show();
					$('#searchtable').html('');*/
				}
			}
	});
}

function setcacheFlag(cb){
	
	if(typeof(Storage) !== "undefined") {
		
		if(!localStorage.setIdxFlag){
			localStorage.setIdxFlag = 0;
		}
		if(localStorage.setLoginFlag!=1){
			if(parseInt(localStorage.setIdxFlag)>5){
				$('#loginModal').modal({backdrop: 'static', keyboard: false});
				$('.modal_login_close').hide();
				cb(0);
			} else if(parseInt(localStorage.setIdxFlag)>3){
				localStorage.setIdxFlag = parseInt(localStorage.setIdxFlag)+1;
				$('#loginModal').modal({backdrop: 'static', keyboard: false});
				cb(0);
			} else {
				localStorage.setIdxFlag = parseInt(localStorage.setIdxFlag)+1;
				cb(1);
			}
		} else {
			cb(1);
		}
	} else {
		// Sorry! No Web Storage support..
		console.log("Sorry! No Web Storage support..");
		cb(1);
	}
}

function Logout(){
	var pluginUrl = locali9idx.pluginUrl;
	var formURL = pluginUrl + 'client-assist.php?action=Logout';
	$.post(formURL,function(data){
		if(data == '1'){
			localStorage.setLoginFlag = 0;
			localStorage.setIdxFlag = 0;
			$('.login_div').html('Please Login');
			$('.fav').css('color','#31708f');
			$('.fav1').css('color','#31708f');
			var dat = '<div class="col-xs-3 col-sm-3 first"><a data-target="#loginModal" id="loginbtn" data-toggle="modal" class="col-sm-2 loginbutton btn">Login</a></div>';
			$('.I9_topbuttons').html(dat);
			window.location.reload();
		}
	});
	
}

function setTopbuttons(sav,fav,srchs) {
	checkfav(); 

	var x = locali9idx.homeUrl+'/canny/favorite';
	var ul = '';
	if(srchs.length>0) {
		ul += '<ul class="dropdown-menu" style="list-style-type:none;">';
		$.each(srchs, function(i, d) {
			ul += '<li><a href="'+d.searchLink+'">'+d.searchName+'</a></li>';
		})
		ul += '<li><a href="#managesrchModal" data-toggle="modal" id="managebtn" onclick="setSavesearch()">Manage Save Searches <i class="fa fa-arrow-circle-right"></i></a></li>';
		ul += '</ul>';
	} else {
		ul = '';
	}
	
	var dat ='<ul class="I9_topbuttons">';
	dat += '<li><a data-target="#loginModal" id="loginbtn" data-toggle="modal" class="col-sm-2 loginbutton btn" style="display:none;">Login</a>';
	dat += '<a href="#" id="logoutbtn" class="col-sm-2 btn logoutbutn" style="display:none;">LogOut</a></li>';
	dat += '<li><a href="#savesearchModal" id="savesearchbtn" data-toggle="modal" class="col-sm-3 btn savesearchbutton" style="display:none;">Save Search (+)</a></li>';
	dat += '<li><a class="btn savesearchbutton logspan btn-block" data-toggle="dropdown" style="display:none;">Searches ( <span id="sav_count">'+sav+'</span>  )</a>'+ul+'</li>';
	dat += '<li><a class="col-sm-3 btn logspan favouratebtn" id="favbtn" hre="'+x+'">Favorites ( <span id="fav_count">'+fav+'</span> )</a></li>';
	dat += '</ul><br></br><br>';
	/*var dat = '<div class="col-xs-3 col-sm-3 first">';
		dat += '<a onclick="Logout()" id="logoutbtn" class="col-sm-2 btn logoutbutn">LogOut</a>';
		dat += '</div><div class="col-xs-3 col-sm-3 second">';
		dat += '<a href="#savesearchModal" id="savesearchbtn" data-toggle="modal" class="col-sm-3 btn savesearchbutton">Save Search (+)</a></div>';
		dat += '<div class="col-xs-3 col-sm-3 third"><a class="btn btn-primary logspan btn-block" data-toggle="dropdown">Searches ( <span id="sav_count">'+sav+'</span> )</a>'+ul;
		dat += '</div>';
		dat += '<div class="col-xs-3 col-sm-3 fourth"><a href="'+x+'" class="col-sm-3 btn logspan favouratebtn" id="favbtn">Favorites ( <span id="fav_count">'+fav+'</span> )</a></div>';*/
		return dat;
}

function setSavesearch(){
	var pluginUrl = locali9idx.pluginUrl;
	var formURL = pluginUrl + 'client-assist.php?action=Managesearch';
	
	$.ajax({
		url : formURL,
		type: "POST",
		dataType: "JSON",
		data : { managesrch : 1 },
		success:function(data, textStatus, jqXHR){
			if(data == '2'){
				$('#loginModal').modal({backdrop: 'static', keyboard: false});
			} else {
				var mes = '<thead><tr><th>Name</th><th>Frequency/th><th>CreateDate</th><th>Delete</th></tr></thead><tbody >';
				
				$.each(data, function(i, item) {
					mes+='<tr><td><a href="'+item.searchLink+'">'+item.searchName+'</a></td>';
					mes += '<td><select id="edit_frequency_'+i+'" name="sfrequency" class="form-control" onchange="changeFreq('+item.saveSearchId+',this.value)"><option value="0" ';
					if(item.frequency == '0'){ 
						mes += 'selected';
					}
					mes +='>No thanks, maybe later</option><option value="-1" ';
					if(item.frequency == '-1'){ 
						mes += 'selected';
					}
					mes +='>Instantly</option><option value="1">Daily</option><option value="3" ';
					if(item.frequency == '3'){ 
						mes += 'selected';
					}
					mes +='>Twice a week</option><option value="7" ';
					if(item.frequency == '7'){ 
						mes += 'selected';
					}
					mes +='>Weekly</option><option value="14" ';
					if(item.frequency == '14'){ 
						mes += 'selected';
					}
					mes +='>Twice a month</option><option value="30" ';
					if(item.frequency == '30'){ 
						mes += 'selected';
					}
					mes +='>Monthly</option></select></td>';
					mes += '<td>'+item.createDate.substring(0, 10)+'</td><td><a onclick="return delsearch('+item.saveSearchId+')"><i class="fa fa-times"></i></a></td></tr>';
					
				});
				mes+='</tbody>';
				$('#srch_load_span').hide();
				$('#searchtable').html(mes);
			}
			
		},
		error: function(jqXHR, textStatus, errorThrown) 
		{
			//if fails      
		}
	});
}

function changeFreq(id,val){
	var pluginUrl = locali9idx.pluginUrl;
	var formURL = pluginUrl + 'client-assist.php?action=changeFreq';
	
	$.ajax({
		url : formURL,
		type: "POST",
		dataType: "JSON",
		data : { searchId : id, freq : val },
		success:function(data, textStatus, jqXHR){
			if(data == '2'){
				$('#loginModal').modal({backdrop: 'static', keyboard: false});
			} else {
				$('#manage_span').html('Changed Successfully...');
				setTimeout(function(){
					$('#manage_span').html('');	
				},800)
			}
		}
	})
}

import '../style/header.scss';
import '../style/contact.scss';
import '../style/footer.scss';

$(document).ready(function(){
    $(document).on('click','.cntamsg',function(){
        $('.contresult').addClass('d-none');
        $('.contactfrm').removeClass('d-none');
    });
     
    $(".contactfrm").on("submit",function(){
        console.log("ddd");
        //get input field values
        var name = $('#name').val(); 
        var email = $('#email').val();
        var coname = $('#companyname').val();
        var contact = $('#contactnumber').val();
        var position = $('#position').val();
        var message = $('#message').val();
        var data =  'username='+name+'&useremail='+email+'&userconame='+coname+'&usercontact='+contact+'&userposition='+position+'&usermessage='+message;

        console.log(data);
        $.ajax({
            type: 'post',
            url: "contact.php", 
            dataType: 'json',
            data:data,
            beforeSend: function() {
                $('#contactSubmit').attr('disabled', true);
                $('#contactSubmit').after('<span class="wait"><span>.</span><span>.</span><span>.</span></span>');
            },
            complete: function() {
                $('#contactSubmit').attr('disabled', false);
                $('.wait').remove();
            },  
            success: function(data){
                console.log(data.text);
                if(data.type == 'error'){
                    var output = '<div class="alert alert-danger" role="alert">'+data.text+'</div>';
                }else{
                    var output = '<div class="cntsuccess"><p class="cnttymsg">'+data.text+'</p><p class="cntamsg">Send another message</p></div>';
                    $('input[type=text],input[type=email],input[type=tel]').val(''); 
                    $('textarea').val(''); 
                    $('.contactfrm').addClass('d-none');
                }
                $('.cntsuccess,.alert').remove();
                $(".contresult").removeClass('d-none').prepend(output);       
            }        
        });
        return false;
    });
});
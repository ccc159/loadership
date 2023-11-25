export const NotificationComponent = () => {
  return (
    <div id='notification' className='flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800' role='alert'>
      <style>
        {`
            #notification {
            visibility: hidden; /* Hidden by default. Visible on click */
            min-width: 250px; /* Set a default minimum width */
            margin-left: -125px; /* Divide value of min-width by 2 */
            text-align: center; /* Centered text */
            position: fixed; /* Sit on top of the screen */
            z-index: 1; /* Add a z-index if needed */
            left: 50%; /* Center the snackbar */
            bottom: 50%; /* 50% from the bottom */
            }
            /* Show the notification when clicking on a button (class added with JavaScript) */
            #notification.show {
            visibility: visible; /* Show the notification */
            /* Add animation: Take 0.5 seconds to fade in and out the notification.
            However, delay the fade out process for 2.5 seconds */
            -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
            animation: fadein 0.5s, fadeout 0.5s 2.5s;
            }
            
            /* Animations to fade the notification in and out */
            @-webkit-keyframes fadein {
            from {opacity: 0;}
            to {opacity: 1;}
            }
            
            @keyframes fadein {
            from {opacity: 0;}
            to {opacity: 1;}
            }
            
            @-webkit-keyframes fadeout {
            from {opacity: 1;}
            to {opacity: 0;}
            }
            
            @keyframes fadeout {
            from {opacity: 1;}
            to {opacity: 0;}
            }
    `}
      </style>

      <div className='inline-flex items-center justify-center flex-shrink-0 w-6 h-6'>
        <img src='/loadership_logo_round.svg' />
      </div>
      <p id='notification_text' className='ms-3 text-sm font-normal'></p>
    </div>
  );
};

export class Notification {
  public static show(text: string) {
    const notification = document.getElementById('notification');
    const notification_text = document.getElementById('notification_text');

    if (!notification || !notification_text) return;

    // update text
    notification_text.innerHTML = text;
    notification.classList.add('show');

    setTimeout(() => {
      notification_text.innerHTML = '';
      notification.classList.remove('show');
    }, 2000);
  }
}

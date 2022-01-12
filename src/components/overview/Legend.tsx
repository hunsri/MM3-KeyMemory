import React from 'react';
import '../css/Overview.css';

/**
 * Shows the player information about the stripes in the game.
 * @returns
 */
const Legend = function legend() {
  return (
    <div id="legendComponent">
      Legend
      <table className="table">
        <tr>
          <td className="tableInformation">Stripe</td>
          <td className="tableInformation">Information</td>
        </tr>
        <tr>
          <td id="greenStripe" className="tableInformation">Green</td>
          <td id="greenStripeInformation" className="tableInformation">You hit the right key</td>
        </tr>
        <tr>
          <td id="secondScorePoints" className="tableInformation">Blue</td>
          <td id="greenStripeInformation" className="tableInformation">You missed a key</td>
        </tr>
        <tr>
          <td id="thirdScorePoints" className="tableInformation">Red</td>
          <td id="greenStripeInformation" className="tableInformation">You hit the wrong key</td>
        </tr>
      </table>
    </div>
  );
};

export default Legend;

const Voting = artifacts.require('Voting.sol');

contract('Voting', (accounts)=>{

    let voteContract = undefined;
    const admin = accounts[0];
    const voter1 = accounts[1];
    const voter2 = accounts[2];
    const voter3 = accounts[3];
    const noneVoter = accounts[4];

    beforeEach(async()=>{
        voteContract = await Voting.deployed();
    });

    it('should add voters', async()=>{
        await voteContract.addVoters([voter1, voter2, voter3]);
        const result = await Promise.all(
            [voter1, voter2, voter3].map(voter => voteContract.voters(voter))
        );
        
        //assert(result[0]===true);
        result.forEach(result=>assert(result===true));
    });

    it('should create a new ballot', async()=>{
        await voteContract.createBallot('Ballot1', ['Choice1','Choice2','Choice3'],10);
        const ballot = await voteContract.ballots(0);
        assert(ballot.name === 'Ballot1');        
    });
})
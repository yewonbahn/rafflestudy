pragma solidity ^0.6.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Pet is ERC721 {
  constructor() ERC721("Pet", "PET") public  {}

  //이 이벤트는 거래 확인에 정말 유용하다. NFT를 발행할 때마다 NFT tokenId, imagePath, 시간 및 사용자 지갑 주소가 반환됩니다.
  event PetNFTCreated (

    uint tokenId,
    string imageURL,
    uint date,
    address payable from
  );


   function mintPetNFT(string memory _tokenURI) external {
       uint _tokenId = totalSupply().add(1);
       _safeMint(msg.sender, _tokenId);
       //takes the user's wallet address and the tokenId to create and set ownership of the NFT
       _setTokenURI(_tokenId, _tokenURI);
       // takes the tokenId and the tokenURI (the location of the image) and links them together
       emit PetNFTCreated(_tokenId, _tokenURI, now, msg.sender);
       //그런 다음 emit 함수를 호출하고 이름을 "PetNFTCreated"로 지정 하여 tokenId, tokenURI, 타임스탬프 및 사용자 지갑 주소가 포함된 이벤트를 내보낸다.
    }

 }
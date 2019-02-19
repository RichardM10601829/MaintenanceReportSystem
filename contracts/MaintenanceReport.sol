pragma solidity ^0.4.25;

contract MaintenanceReport{
        
    struct Room {
        uint number_report;
        string status_room;
    }
    
    struct ReportRoom {
        string room_name;
        string equip;
        string problem;
    }
    
    mapping(address=>uint256) balance_token;
    
    mapping(string=>Room) Rooms;
    
    mapping(uint=>ReportRoom) ReportRooms;
    uint no_problem;
    
    event ProblemAdded(uint no_problem, string room_name);
    event Incentive(uint no_problem, address addr);
    
    constructor() public{
        
        no_problem = 0;
        
        Rooms["MA001"].number_report = 0;
        Rooms["MA001"].status_room = "Open";
        
        Rooms["MA002"].number_report = 0;
        Rooms["MA002"].status_room = "Open";
        
        Rooms["MA003"].number_report = 0;
        Rooms["MA003"].status_room = "Open";
        
        Rooms["MA004"].number_report = 0;
        Rooms["MA004"].status_room = "Open";
        
    }
    
    function getToken(address addr) public view returns(uint256) {
        return balance_token[addr];
    }
        
    function getRoomCondition(string name) public returns (uint, string)
    {
        if (Rooms[name].number_report > 4)
        {
            Rooms[name].status_room = "Closed";
        }
        return (Rooms[name].number_report, Rooms[name].status_room);
    }
    
    function reportRoom(string room_name, string equipment, string problem) public {
        ReportRooms[no_problem].room_name = room_name;
        ReportRooms[no_problem].equip = equipment;
        ReportRooms[no_problem].problem = problem;
        
        emit ProblemAdded(no_problem, room_name);
        
        
        Rooms[room_name].number_report += 1;
        
        if (Rooms[room_name].number_report <= 4)
        {
            balance_token[msg.sender] += 10;
            emit Incentive(no_problem, msg.sender);
        }
        
        no_problem = no_problem+1;
        
    }
    
}
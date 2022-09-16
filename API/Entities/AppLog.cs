namespace API.Entities
{
    public class AppLog
    {
        public long Id { get; set; }
        public string EMail { get; set; }

        public int Type{ get; set; }

        public string Message { get; set; }

        public DateTime EventTime { get; set; }
    }
}